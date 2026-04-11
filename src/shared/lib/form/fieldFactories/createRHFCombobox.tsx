'use client';

import type { JSX, ReactNode } from 'react';

import {
  Controller,
  type FieldValues,
  type Path,
  useFormContext,
} from 'react-hook-form';
import type { input, ZodObject } from 'zod/v4';

import { Combobox, type ComboboxProps } from '../../../ui/Combobox/Combobox';
import type { ComboboxOption } from '../../../ui/Combobox/types';
import { formatRequiredLabel } from '../utils/formatRequiredLabel';
import { isZodObjectFieldRequired } from '../utils/isZodObjectFieldRequired';
import { requiredFromSchemaShape } from '../utils/requiredFromSchemaShape';
import {
  getZodFormFieldUiMeta,
  type ZodFormFieldUiMeta,
} from '../zod-form-field-meta';

/** Что записывать в поле формы при выборе пункта: `value`, `label` или весь объект опции. */
export type ComboboxReturnType = 'value' | 'label' | 'object';

export type RHFComboboxFieldProps<TValue extends string = string> = Omit<
  ComboboxProps<TValue>,
  'value' | 'defaultValue' | 'onValueChange' | 'label' | 'options'
> & {
  label?: ReactNode;
  required?: boolean;
  options?: ComboboxOption<TValue>[];
  returnType?: ComboboxReturnType;
  onValueChange?: ComboboxProps<TValue>['onValueChange'];
};

function mergeRHFComboboxPropsWithMeta<TOptionValue extends string>(
  props: Partial<RHFComboboxFieldProps<TOptionValue>>,
  fromMeta: ZodFormFieldUiMeta | undefined,
): Partial<RHFComboboxFieldProps<TOptionValue>> {
  if (!fromMeta) {
    return props;
  }

  return {
    ...props,
    options:
      props.options ??
      (fromMeta.options as ComboboxOption<TOptionValue>[] | undefined),
    placeholder: props.placeholder ?? fromMeta.placeholder,
    description: props.description ?? fromMeta.description,
    disabled: props.disabled ?? fromMeta.disabled,
    orientation: props.orientation ?? fromMeta.orientation,
    triggerClassName: props.triggerClassName ?? fromMeta.triggerClassName,
    contentClassName: props.contentClassName ?? fromMeta.contentClassName,
  };
}

function resolveSelectedOption<TValue extends string>(
  options: ComboboxOption<TValue>[],
  stored: unknown,
  returnType: ComboboxReturnType,
  isItemEqualToValue?: (a: unknown, b: unknown) => boolean,
): ComboboxOption<TValue> | null {
  if (stored === null || stored === undefined) {
    return null;
  }

  if (returnType === 'object') {
    const obj = stored as ComboboxOption<TValue>;
    return (
      options.find((o) =>
        isItemEqualToValue ? isItemEqualToValue(o, obj) : o.value === obj.value,
      ) ?? null
    );
  }

  if (returnType === 'value') {
    return options.find((o) => o.value === stored) ?? null;
  }

  return options.find((o) => o.label === stored) ?? null;
}

function extractStoredValue<TValue extends string>(
  option: ComboboxOption<TValue> | null,
  returnType: ComboboxReturnType,
): unknown {
  if (!option) {
    return null;
  }
  if (returnType === 'value') {
    return option.value;
  }
  if (returnType === 'label') {
    return option.label;
  }
  return option;
}

const BaseRHFComboboxField = <
  TForm extends FieldValues,
  TValue extends string = string,
>({
  name,
  label = '',
  required = false,
  returnType = 'value',
  options: optionsProp,
  onValueChange: onValueChangeProp,
  onOpenChange: onOpenChangeProp,
  isItemEqualToValue: isItemEqualToValueProp,
  ...props
}: RHFComboboxFieldProps<TValue> & { name: Path<TForm> }) => {
  const { control } = useFormContext<TForm>();
  const options = optionsProp ?? [];

  const defaultObjectEquality = (a: unknown, b: unknown) =>
    (a as ComboboxOption<TValue>).value === (b as ComboboxOption<TValue>).value;

  const isItemEqualToValue =
    isItemEqualToValueProp ??
    (returnType === 'object' ? defaultObjectEquality : undefined);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => {
        const selected = resolveSelectedOption(
          options,
          field.value,
          returnType,
          isItemEqualToValue,
        );

        return (
          <Combobox<TValue>
            {...props}
            options={options}
            label={formatRequiredLabel(label, required)}
            errorText={fieldState.error?.message}
            value={selected}
            isItemEqualToValue={isItemEqualToValue}
            onValueChange={(newValue, eventDetails) => {
              field.onChange(
                extractStoredValue(
                  newValue as ComboboxOption<TValue> | null,
                  returnType,
                ),
              );
              onValueChangeProp?.(newValue, eventDetails);
            }}
            onOpenChange={(open, eventDetails) => {
              onOpenChangeProp?.(open, eventDetails);
              if (!open) {
                field.onBlur();
              }
            }}
            disabled={props.disabled || formState.isSubmitting}
            data-testid={props['data-testid']}
          />
        );
      }}
    />
  );
};

/**
 * Фабрика `Combobox` для React Hook Form: тип формы — `input<typeof schema>`.
 * Подпись, `options`, `placeholder` и др. — из Zod meta (`formField`) или пропсов (пропсы важнее).
 * `required` для подписи по умолчанию — из схемы.
 *
 * `returnType` задаёт, что попадает в поле формы: `value` (строка из опции), `label` (как в опции;
 * для стабильного сравнения удобны строковые подписи) или `object` (вся опция `{ value, label, … }`).
 *
 * @example Поле с фиксированным `name` и опциями в meta:
 * ```tsx
 * const CityCombobox = createRHFCombobox(userSchema, 'city');
 * <CityCombobox />
 * ```
 *
 * @example `name` и опции в пропсах:
 * ```tsx
 * const ComboboxInput = createRHFCombobox(userSchema);
 * <ComboboxInput name="city" options={cities} returnType="object" />
 * ```
 */
export function createRHFCombobox<
  TSchema extends ZodObject,
  TName extends keyof TSchema['shape'] & string,
>(
  schema: TSchema,
  name: TName,
): (props?: Omit<RHFComboboxFieldProps, 'name' | 'options'>) => JSX.Element;

export function createRHFCombobox<TSchema extends ZodObject>(
  schema: TSchema,
): <TValue extends string>(
  props: RHFComboboxFieldProps<TValue> & {
    name: keyof TSchema['shape'] & string;
  },
) => JSX.Element;

export function createRHFCombobox<TSchema extends ZodObject>(
  schema: TSchema,
  name?: keyof TSchema['shape'] & string,
):
  | ((props?: Omit<RHFComboboxFieldProps, 'name' | 'options'>) => JSX.Element)
  | (<TValue extends string>(
      props: RHFComboboxFieldProps<TValue> & {
        name: keyof TSchema['shape'] & string;
      },
    ) => JSX.Element) {
  if (name !== undefined) {
    const fieldName = name;
    const requiredDefault = isZodObjectFieldRequired(schema, fieldName);
    const fromMeta = getZodFormFieldUiMeta(schema, fieldName);

    return function RHFComboboxWithName<TOptionValue extends string>(
      props?: Omit<RHFComboboxFieldProps<TOptionValue>, 'name' | 'options'>,
    ) {
      const p = props ?? {};
      const merged = mergeRHFComboboxPropsWithMeta<TOptionValue>(p, fromMeta);
      const label = p.label ?? fromMeta?.label ?? '';
      const dataTestId = p['data-testid'] ?? fromMeta?.['data-testid'];
      const returnType = p.returnType ?? 'value';

      return (
        <BaseRHFComboboxField<input<TSchema>, TOptionValue>
          {...merged}
          name={fieldName as unknown as Path<input<TSchema>>}
          label={label}
          required={p.required ?? requiredDefault}
          returnType={returnType}
          data-testid={dataTestId}
        />
      );
    };
  }

  return function RHFComboboxDynamic<TOptionValue extends string>(
    props: RHFComboboxFieldProps<TOptionValue> & {
      name: keyof TSchema['shape'] & string;
    },
  ) {
    const { name: fieldName, ...rest } = props;
    const fromMeta = getZodFormFieldUiMeta(schema, fieldName);
    const required = requiredFromSchemaShape(schema, fieldName);
    const merged = mergeRHFComboboxPropsWithMeta(rest, fromMeta);
    const label = rest.label ?? fromMeta?.label ?? '';
    const dataTestId = rest['data-testid'] ?? fromMeta?.['data-testid'];
    const returnType = rest.returnType ?? 'value';

    return (
      <BaseRHFComboboxField<input<TSchema>, TOptionValue>
        {...merged}
        name={fieldName as Path<input<TSchema>>}
        label={label}
        required={rest.required ?? required}
        returnType={returnType}
        data-testid={dataTestId}
      />
    );
  };
}
