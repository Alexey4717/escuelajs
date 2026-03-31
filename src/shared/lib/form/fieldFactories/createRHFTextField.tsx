'use client';

import type { JSX, ReactNode } from 'react';

import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from 'react-hook-form';

import { TextField, TextFieldProps } from '../../../ui/TextField/TextField';
import { BaseFactoryArg } from '../types';
import { formatRequiredLabel } from '../utils/formatRequiredLabel';

export type BaseTextFieldComponentProps = Omit<
  TextFieldProps,
  'name' | 'label' | 'errorText' | 'errors'
> & {
  label?: ReactNode;
  required?: boolean;
};

const BaseRHFTextField = <TForm extends FieldValues>({
  name,
  label = '',
  required = false,
  ...props
}: BaseTextFieldComponentProps & { name: Path<TForm> }) => {
  const { control } = useFormContext<TForm>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => (
        <TextField
          {...field}
          value={field.value ?? ''}
          label={formatRequiredLabel(label, required)}
          errorText={fieldState.error?.message}
          {...props}
          onChange={(e) => {
            field.onChange(e);
            props.onChange?.(e);
          }}
          onBlur={(e) => {
            field.onBlur();
            props.onBlur?.(e);
          }}
          disabled={props.disabled || formState.isSubmitting}
        />
      )}
    />
  );
};

/**
 * Создаёт компонент `TextField`, связанный с React Hook Form, с **предопределённым** `name`
 * и опциональными значениями по умолчанию для подписи, обязательности и `data-testid`.
 *
 * @example
 * ```tsx
 * const FullNameField = createRHFTextField<TUserForm>({
 *   name: 'fullName',
 *   label: 'ФИО',
 *   required: true,
 *   'data-testid': 'userForm__input__fullName',
 * });
 *
 * // Внутри <FormProvider>:
 * <FullNameField />
 * ```
 *
 * @remarks
 * - `name` задаётся только в фабрике и **не передаётся** в пропсах компонента (тип исключает `name`).
 * - `label`, `required` и `data-testid` из конфига можно **переопределить** при рендере, если передать их в пропсах.
 * - Остальные пропсы — как у {@link TextField}, кроме `errorText` / `errors` (их выставляет RHF).
 *
 * @typeParam TForm — тип значений формы (`react-hook-form` / схема полей).
 */
export function createRHFTextField<TForm extends FieldValues>(
  config: BaseFactoryArg<TForm>,
): (props: Omit<BaseTextFieldComponentProps, 'name'>) => JSX.Element;

/**
 * Создаёт **универсальный** компонент `TextField` для формы: без предзаданного `name`;
 * имя поля и остальное задаются **только при использовании**.
 *
 * @example
 * ```tsx
 * const TextInput = createRHFTextField<TUserForm>();
 *
 * <TextInput
 *   name="fullName"
 *   label="ФИО"
 *   required
 *   data-testid="userForm__input__fullName"
 * />
 * ```
 *
 * @remarks
 * - Подходит для редких полей, динамических имён или когда не хочется заводить отдельную фабрику на каждое поле.
 * - `name` обязателен в пропсах и должен совпадать с {@link Path} полей `TForm`.
 *
 * @typeParam TForm — тип значений формы (`react-hook-form` / схема полей).
 */
export function createRHFTextField<TForm extends FieldValues>(): (
  props: BaseTextFieldComponentProps & { name: Path<TForm> },
) => JSX.Element;

export function createRHFTextField<TForm extends FieldValues>(
  config?: BaseFactoryArg<TForm>,
): (
  props: BaseFactoryArg<TForm> extends typeof config
    ? Omit<BaseTextFieldComponentProps, 'name'>
    : BaseTextFieldComponentProps & { name: Path<TForm> },
) => JSX.Element;

/**
 * Фабрика полей ввода для React Hook Form: режим с конфигом (фиксированный `name`) или без конфига (все пропсы снаружи).
 */
export function createRHFTextField<TForm extends FieldValues>(
  config?: BaseFactoryArg<TForm>,
) {
  if (config) {
    const { name, required, label = '', 'data-testid': dataTestId } = config;

    return function RHFTextField(
      props: Omit<BaseTextFieldComponentProps, 'name'>,
    ) {
      return (
        <BaseRHFTextField<TForm>
          {...props}
          name={name}
          label={props.label ?? label}
          required={props.required ?? required}
          data-testid={props['data-testid'] ?? dataTestId}
        />
      );
    };
  }

  return function RHFTextField(
    props: BaseTextFieldComponentProps & { name: Path<TForm> },
  ) {
    return <BaseRHFTextField<TForm> {...props} />;
  };
}
