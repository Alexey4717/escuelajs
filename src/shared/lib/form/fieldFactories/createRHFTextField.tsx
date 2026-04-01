'use client';

import type { JSX, ReactNode } from 'react';

import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from 'react-hook-form';
import type { input, ZodObject } from 'zod/v4';

import { TextField, TextFieldProps } from '../../../ui/TextField/TextField';
import { formatRequiredLabel } from '../utils/formatRequiredLabel';
import { isZodObjectFieldRequired } from '../utils/isZodObjectFieldRequired';
import { requiredFromSchemaShape } from '../utils/requiredFromSchemaShape';
import { getZodFormFieldUiMeta } from '../zod-form-field-meta';

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
 * Фабрика `TextField` для React Hook Form: тип формы — `input<typeof schema>`,
 * обязательность подписи по умолчанию — из `schema.shape` (для ключей верхнего уровня).
 *
 * @example С фиксированным полем: второй аргумент — ключ из `schema.shape`; подпись и test id — в Zod meta (`formField`) или в пропсах:
 * ```tsx
 * const EmailField = createRHFTextField(loginSchema, 'email');
 * <EmailField />
 * ```
 *
 * @example Без второго аргумента — `name` (и при необходимости `label`) при рендере; для ключей
 * `shape` подставляются значения из meta:
 * ```tsx
 * const TextInput = createRHFTextField(loginSchema);
 * <TextInput name="email" />
 * ```
 */
export function createRHFTextField<
  TSchema extends ZodObject,
  TName extends keyof TSchema['shape'] & string,
>(
  schema: TSchema,
  name: TName,
): (props: Omit<BaseTextFieldComponentProps, 'name'>) => JSX.Element;

export function createRHFTextField<TSchema extends ZodObject>(
  schema: TSchema,
): (
  props: BaseTextFieldComponentProps & {
    name: keyof TSchema['shape'] & string;
  },
) => JSX.Element;

export function createRHFTextField<TSchema extends ZodObject>(
  schema: TSchema,
  name?: keyof TSchema['shape'] & string,
):
  | ((props: Omit<BaseTextFieldComponentProps, 'name'>) => JSX.Element)
  | ((
      props: BaseTextFieldComponentProps & {
        name: keyof TSchema['shape'] & string;
      },
    ) => JSX.Element) {
  if (name !== undefined) {
    const required = isZodObjectFieldRequired(schema, name);
    const fromMeta = getZodFormFieldUiMeta(schema, name);

    return function RHFTextFieldWithName(
      props: Omit<BaseTextFieldComponentProps, 'name'>,
    ) {
      const label = props.label ?? fromMeta?.label ?? '';
      const dataTestId = props['data-testid'] ?? fromMeta?.['data-testid'];

      return (
        <BaseRHFTextField<input<TSchema>>
          {...props}
          name={name as unknown as Path<input<TSchema>>}
          label={label}
          required={props.required ?? required}
          data-testid={dataTestId}
        />
      );
    };
  }

  return function RHFTextFieldDynamic(
    props: BaseTextFieldComponentProps & {
      name: keyof TSchema['shape'] & string;
    },
  ) {
    const { name: fieldName, ...rest } = props;
    const fromMeta = getZodFormFieldUiMeta(schema, fieldName);
    const required = requiredFromSchemaShape(schema, fieldName);
    const label = rest.label ?? fromMeta?.label ?? '';
    const dataTestId = rest['data-testid'] ?? fromMeta?.['data-testid'];

    return (
      <BaseRHFTextField<input<TSchema>>
        {...rest}
        name={fieldName as Path<input<TSchema>>}
        label={label}
        required={rest.required ?? required}
        data-testid={dataTestId}
      />
    );
  };
}
