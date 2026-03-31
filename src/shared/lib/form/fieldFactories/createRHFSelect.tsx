'use client';

import type { JSX, ReactNode } from 'react';

import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from 'react-hook-form';

import {
  SelectField,
  SelectFieldProps,
  SelectItem,
} from '../../../ui/SelectField/SelectField';
import { BaseFactoryArg, SelectOption } from '../types';
import { formatRequiredLabel } from '../utils/formatRequiredLabel';

export type RHFSelectFieldProps<TValue extends string = string> = Omit<
  SelectFieldProps<TValue>,
  'children' | 'value' | 'defaultValue' | 'label' | 'errorText' | 'errors'
> & {
  label?: ReactNode;
  required?: boolean;
  options?: SelectOption<TValue>[];
  children?: React.ReactNode;
};

const BaseRHFSelectField = <
  TForm extends FieldValues,
  TValue extends string = string,
>({
  name,
  label = '',
  required = false,
  options,
  children,
  onValueChange: onValueChangeProp,
  onOpenChange: onOpenChangeProp,
  ...props
}: RHFSelectFieldProps<TValue> & { name: Path<TForm> }) => {
  const { control } = useFormContext<TForm>();

  const selectItems =
    options && options.length > 0
      ? options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.icon ? (
              <span className="inline-flex items-center gap-2">
                <span className="inline-flex shrink-0">{opt.icon}</span>
                <span>{opt.label}</span>
              </span>
            ) : (
              opt.label
            )}
          </SelectItem>
        ))
      : children;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => (
        <SelectField<TValue>
          {...props}
          name={field.name}
          label={formatRequiredLabel(label, required)}
          errorText={fieldState.error?.message}
          value={(field.value ?? '') as TValue}
          onValueChange={(val) => {
            field.onChange(val);
            onValueChangeProp?.(val);
          }}
          onOpenChange={(open) => {
            onOpenChangeProp?.(open);
            if (!open) {
              field.onBlur();
            }
          }}
          disabled={props.disabled || formState.isSubmitting}
          data-testid={props['data-testid']}
        >
          {selectItems ?? null}
        </SelectField>
      )}
    />
  );
};

/**
 * Создаёт `SelectField` для React Hook Form с **фиксированными** `name` и `options`;
 * подпись, обязательность и `data-testid` можно задать в конфиге и при необходимости
 * переопределить при рендере.
 *
 * @example
 * ```tsx
 * const RoleSelect = createRHFSelect<TUserForm, 'admin' | 'moderator'>({
 *   name: 'role',
 *   label: 'Роль',
 *   required: true,
 *   options: [
 *     { label: 'Админ', value: 'admin' },
 *     { label: 'Модератор', value: 'moderator' },
 *   ],
 * });
 *
 * <RoleSelect />
 * ```
 *
 * @remarks
 * - `name` и `options` задаются только в фабрике и **не передаются** в пропсах (в т.ч. нельзя переопределить `options`).
 * - `label`, `required` и `data-testid` из конфига можно **переопределить** при рендере.
 * - Остальные пропсы — как у {@link SelectField}, кроме `value` / `errorText` / `errors` / `children` (список из `options`). Дополнительный `onValueChange` вызывается после обновления значения в RHF.
 *
 * @typeParam TForm — тип значений формы.
 * @typeParam TValue — строковый литерал/union значений пунктов (совпадает с `value` в `options`).
 */
export function createRHFSelect<
  TForm extends FieldValues,
  TValue extends string,
>(
  config: BaseFactoryArg<TForm> & { options: SelectOption<TValue>[] },
): (
  props?: Omit<RHFSelectFieldProps<TValue>, 'name' | 'options' | 'children'>,
) => JSX.Element;

/**
 * Создаёт `SelectField` с фиксированным `name`; список `options` передаётся **при использовании**.
 *
 * @example
 * ```tsx
 * const RoleSelect = createRHFSelect<TUserForm>({
 *   name: 'role',
 *   label: 'Роль',
 *   required: true,
 * });
 *
 * <RoleSelect
 *   options={[
 *     { label: 'Админ', value: 'admin' },
 *     { label: 'Модератор', value: 'moderator' },
 *   ]}
 * />
 * ```
 *
 * @remarks
 * - `name` задаётся только в фабрике.
 * - `options` **обязательны** в пропсах компонента (тип исключает `name`).
 * - `label`, `required` и `data-testid` можно переопределить при рендере.
 *
 * @typeParam TForm — тип значений формы.
 */
export function createRHFSelect<TForm extends FieldValues>(
  config: BaseFactoryArg<TForm>,
): <TValue extends string>(
  props: Omit<RHFSelectFieldProps<TValue>, 'name' | 'options'> & {
    name?: never;
    options: SelectOption<TValue>[];
  },
) => JSX.Element;

/**
 * Универсальный `SelectField`: без предзаданного `name` и `options` — всё задаётся в пропсах.
 *
 * @example
 * ```tsx
 * const SelectInput = createRHFSelect<TUserForm>();
 *
 * <SelectInput
 *   name="role"
 *   label="Роль"
 *   required
 *   options={[
 *     { label: 'Админ', value: 'admin' },
 *     { label: 'Модератор', value: 'moderator' },
 *   ]}
 * />
 * ```
 *
 * @remarks
 * - `name` должен совпадать с типом `Path` полей `TForm`.
 * - Либо `options`, либо `children` (кастомная разметка пунктов) — как у {@link SelectField}.
 *
 * @typeParam TForm — тип значений формы.
 */
export function createRHFSelect<TForm extends FieldValues>(): <
  TValue extends string,
>(
  props: RHFSelectFieldProps<TValue> & { name: Path<TForm> },
) => JSX.Element;

/**
 * Фабрика полей выбора для React Hook Form: три режима — с фиксированными `options`, с
 * `options` при использовании, или полностью дженерик.
 */
export function createRHFSelect<
  TForm extends FieldValues,
  TValue extends string = string,
>(config?: BaseFactoryArg<TForm> & { options?: SelectOption<TValue>[] }) {
  if (config) {
    const {
      name,
      required,
      label = '',
      'data-testid': dataTestId,
      options,
    } = config;

    if (options) {
      return function RHFSelectWithOptions(
        props?: Omit<
          RHFSelectFieldProps<TValue>,
          'name' | 'options' | 'children'
        >,
      ) {
        const p = props ?? {};
        return (
          <BaseRHFSelectField<TForm, TValue>
            {...p}
            name={name}
            label={p.label ?? label}
            required={p.required ?? required}
            data-testid={p['data-testid'] ?? dataTestId}
            options={options}
          />
        );
      };
    }

    return function RHFSelect<TOptionValue extends string>(
      props: Omit<RHFSelectFieldProps<TOptionValue>, 'name' | 'options'> & {
        name?: never;
        options: SelectOption<TOptionValue>[];
      },
    ) {
      const {
        label: innerLabel = label,
        required: reqProp,
        'data-testid': tid,
        options: optionsProp,
        ...rest
      } = props;

      return (
        <BaseRHFSelectField<TForm, TOptionValue>
          {...rest}
          name={name}
          label={innerLabel}
          required={reqProp ?? required}
          data-testid={tid ?? dataTestId}
          options={optionsProp}
        />
      );
    };
  }

  return function RHFSelect<TOptionValue extends string>(
    props: RHFSelectFieldProps<TOptionValue> & { name: Path<TForm> },
  ) {
    return <BaseRHFSelectField<TForm, TOptionValue> {...props} />;
  };
}
