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
  SelectField,
  SelectFieldProps,
  SelectItem,
} from '../../../ui/SelectField/SelectField';
import type { SelectOption } from '../types';
import { formatRequiredLabel } from '../utils/formatRequiredLabel';
import { isZodObjectFieldRequired } from '../utils/isZodObjectFieldRequired';
import { requiredFromSchemaShape } from '../utils/requiredFromSchemaShape';
import {
  getZodFormFieldUiMeta,
  type ZodFormFieldUiMeta,
} from '../zod-form-field-meta';

export type RHFSelectFieldProps<TValue extends string = string> = Omit<
  SelectFieldProps<TValue>,
  'children' | 'value' | 'defaultValue' | 'label' | 'errorText' | 'errors'
> & {
  label?: ReactNode;
  required?: boolean;
  options?: SelectOption<TValue>[];
  children?: React.ReactNode;
};

function mergeRHFSelectPropsWithMeta<TOptionValue extends string>(
  props: Partial<RHFSelectFieldProps<TOptionValue>>,
  fromMeta: ZodFormFieldUiMeta | undefined,
): Partial<RHFSelectFieldProps<TOptionValue>> {
  if (!fromMeta) {
    return props;
  }

  return {
    ...props,
    options:
      props.options ??
      (fromMeta.options as SelectOption<TOptionValue>[] | undefined),
    placeholder: props.placeholder ?? fromMeta.placeholder,
    description: props.description ?? fromMeta.description,
    size: props.size ?? fromMeta.size,
    disabled: props.disabled ?? fromMeta.disabled,
    orientation: props.orientation ?? fromMeta.orientation,
    triggerClassName: props.triggerClassName ?? fromMeta.triggerClassName,
    contentClassName: props.contentClassName ?? fromMeta.contentClassName,
  };
}

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
 * Фабрика `SelectField` для React Hook Form: тип формы — `input<typeof schema>`.
 * Подпись, `options`, `placeholder` и др. — из Zod meta (`formField`) или пропсов (пропсы важнее).
 * `required` для подписи по умолчанию — из схемы.
 *
 * @example Фиксированное поле (всё в meta у ключа схемы, в т.ч. `options`):
 * ```tsx
 * const RoleSelect = createRHFSelect(userSchema, 'role');
 * <RoleSelect />
 * ```
 *
 * @example Полностью в пропсах:
 * ```tsx
 * const SelectInput = createRHFSelect(userSchema);
 * <SelectInput name="role" />
 * ```
 */
export function createRHFSelect<
  TSchema extends ZodObject,
  TName extends keyof TSchema['shape'] & string,
>(
  schema: TSchema,
  name: TName,
): (
  props?: Omit<RHFSelectFieldProps, 'name' | 'options' | 'children'>,
) => JSX.Element;

export function createRHFSelect<TSchema extends ZodObject>(
  schema: TSchema,
): <TValue extends string>(
  props: RHFSelectFieldProps<TValue> & {
    name: keyof TSchema['shape'] & string;
  },
) => JSX.Element;

export function createRHFSelect<TSchema extends ZodObject>(
  schema: TSchema,
  name?: keyof TSchema['shape'] & string,
):
  | ((
      props?: Omit<RHFSelectFieldProps, 'name' | 'options' | 'children'>,
    ) => JSX.Element)
  | (<TValue extends string>(
      props: RHFSelectFieldProps<TValue> & {
        name: keyof TSchema['shape'] & string;
      },
    ) => JSX.Element) {
  if (name !== undefined) {
    const fieldName = name;
    const requiredDefault = isZodObjectFieldRequired(schema, fieldName);
    const fromMeta = getZodFormFieldUiMeta(schema, fieldName);

    return function RHFSelectWithName<TOptionValue extends string>(
      props?: Omit<
        RHFSelectFieldProps<TOptionValue>,
        'name' | 'options' | 'children'
      >,
    ) {
      const p = props ?? {};
      const merged = mergeRHFSelectPropsWithMeta<TOptionValue>(p, fromMeta);
      const label = p.label ?? fromMeta?.label ?? '';
      const dataTestId = p['data-testid'] ?? fromMeta?.['data-testid'];

      return (
        <BaseRHFSelectField<input<TSchema>, TOptionValue>
          {...merged}
          name={fieldName as unknown as Path<input<TSchema>>}
          label={label}
          required={p.required ?? requiredDefault}
          data-testid={dataTestId}
        />
      );
    };
  }

  return function RHFSelectDynamic<TOptionValue extends string>(
    props: RHFSelectFieldProps<TOptionValue> & {
      name: keyof TSchema['shape'] & string;
    },
  ) {
    const { name: fieldName, ...rest } = props;
    const fromMeta = getZodFormFieldUiMeta(schema, fieldName);
    const required = requiredFromSchemaShape(schema, fieldName);
    const merged = mergeRHFSelectPropsWithMeta(rest, fromMeta);
    const label = rest.label ?? fromMeta?.label ?? '';
    const dataTestId = rest['data-testid'] ?? fromMeta?.['data-testid'];

    return (
      <BaseRHFSelectField<input<TSchema>, TOptionValue>
        {...merged}
        name={fieldName as Path<input<TSchema>>}
        label={label}
        required={rest.required ?? required}
        data-testid={dataTestId}
      />
    );
  };
}
