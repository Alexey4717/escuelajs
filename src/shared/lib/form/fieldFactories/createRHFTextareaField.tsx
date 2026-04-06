'use client';

import type { JSX, ReactNode } from 'react';

import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from 'react-hook-form';
import type { input, ZodObject } from 'zod/v4';

import {
  TextareaField,
  type TextareaFieldProps,
} from '../../../ui/TextField/TextareaField';
import { formatRequiredLabel } from '../utils/formatRequiredLabel';
import { isZodObjectFieldRequired } from '../utils/isZodObjectFieldRequired';
import { requiredFromSchemaShape } from '../utils/requiredFromSchemaShape';
import { getZodFormFieldUiMeta } from '../zod-form-field-meta';

export type BaseTextareaFieldComponentProps = Omit<
  TextareaFieldProps,
  'name' | 'label' | 'errorText' | 'errors'
> & {
  label?: ReactNode;
  required?: boolean;
};

const BaseRHFTextareaField = <TForm extends FieldValues>({
  name,
  label = '',
  required = false,
  ...props
}: BaseTextareaFieldComponentProps & { name: Path<TForm> }) => {
  const { control } = useFormContext<TForm>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => (
        <TextareaField
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

/** Фабрика `TextareaField` для React Hook Form. */
export function createRHFTextareaField<
  TSchema extends ZodObject,
  TName extends keyof TSchema['shape'] & string,
>(
  schema: TSchema,
  name: TName,
): (props: Omit<BaseTextareaFieldComponentProps, 'name'>) => JSX.Element;

export function createRHFTextareaField<TSchema extends ZodObject>(
  schema: TSchema,
): (
  props: BaseTextareaFieldComponentProps & {
    name: keyof TSchema['shape'] & string;
  },
) => JSX.Element;

export function createRHFTextareaField<TSchema extends ZodObject>(
  schema: TSchema,
  name?: keyof TSchema['shape'] & string,
):
  | ((props: Omit<BaseTextareaFieldComponentProps, 'name'>) => JSX.Element)
  | ((
      props: BaseTextareaFieldComponentProps & {
        name: keyof TSchema['shape'] & string;
      },
    ) => JSX.Element) {
  if (name !== undefined) {
    const required = isZodObjectFieldRequired(schema, name);
    const fromMeta = getZodFormFieldUiMeta(schema, name);

    return function RHFTextareaFieldWithName(
      props: Omit<BaseTextareaFieldComponentProps, 'name'>,
    ) {
      const label = props.label ?? fromMeta?.label ?? '';
      const dataTestId = props['data-testid'] ?? fromMeta?.['data-testid'];

      return (
        <BaseRHFTextareaField<input<TSchema>>
          {...props}
          name={name as unknown as Path<input<TSchema>>}
          label={label}
          required={props.required ?? required}
          data-testid={dataTestId}
        />
      );
    };
  }

  return function RHFTextareaFieldDynamic(
    props: BaseTextareaFieldComponentProps & {
      name: keyof TSchema['shape'] & string;
    },
  ) {
    const { name: fieldName, ...rest } = props;
    const fromMeta = getZodFormFieldUiMeta(schema, fieldName);
    const required = requiredFromSchemaShape(schema, fieldName);
    const label = rest.label ?? fromMeta?.label ?? '';
    const dataTestId = rest['data-testid'] ?? fromMeta?.['data-testid'];

    return (
      <BaseRHFTextareaField<input<TSchema>>
        {...rest}
        name={fieldName as Path<input<TSchema>>}
        label={label}
        required={rest.required ?? required}
        data-testid={dataTestId}
      />
    );
  };
}
