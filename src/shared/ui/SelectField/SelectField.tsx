'use client';

import { type ComponentProps, useId } from 'react';

import { cn } from '../../lib/styles/cn';
import {
  textFieldDescriptionClassName,
  textFieldErrorClassName,
  textFieldLabelClassName,
} from '../TextField/classNames';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '../TextField/components/Field';
import { Select } from './components/Select';
import { SelectContent } from './components/SelectContent';
import { SelectTrigger } from './components/SelectTrigger';
import { SelectValue } from './components/SelectValue';

/**
 * `TValue` — union допустимых значений (строки Radix Select); по умолчанию `string`.
 */
export type SelectFieldProps<TValue extends string = string> = Omit<
  ComponentProps<typeof Select>,
  'children' | 'value' | 'defaultValue' | 'onValueChange'
> & {
  id?: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  /** Одна строка ошибки; если задано, показывается вместо `errors`. */
  errorText?: string;
  /** Несколько ошибок (например, из GraphQL / zod). */
  errors?: Array<{ message?: string } | undefined>;
  placeholder?: string;
  size?: 'sm' | 'default';
  triggerClassName?: string;
  contentClassName?: string;
  contentProps?: Omit<ComponentProps<typeof SelectContent>, 'children'>;
  children: React.ReactNode;
  /** Атрибут для тестирования. Пробрасывается на триггер выбора (кнопка Radix). */
  'data-testid'?: string;
  value?: TValue;
  defaultValue?: TValue;
  onValueChange?: (value: TValue) => void;
} & Pick<ComponentProps<typeof Field>, 'orientation'> &
  Pick<
    ComponentProps<typeof SelectTrigger>,
    'aria-describedby' | 'aria-invalid'
  >;

export function SelectField<TValue extends string = string>({
  id: idProp,
  label,
  description,
  errorText,
  errors,
  orientation = 'vertical',
  disabled,
  placeholder,
  size = 'default',
  triggerClassName,
  contentClassName,
  contentProps,
  children,
  'aria-describedby': ariaDescribedByProp,
  'aria-invalid': ariaInvalidProp,
  'data-testid': dataTestId,
  ...selectProps
}: SelectFieldProps<TValue>) {
  const generatedId = useId();
  const triggerId = idProp ?? generatedId;
  const descriptionId = description ? `${triggerId}-description` : undefined;
  const hasVisibleError =
    Boolean(errorText) || Boolean(errors?.some((e) => e?.message));
  const invalid = hasVisibleError || ariaInvalidProp === true;
  const errorId = hasVisibleError ? `${triggerId}-error` : undefined;

  const ariaDescribedBy = [ariaDescribedByProp, descriptionId, errorId]
    .filter(Boolean)
    .join(' ');

  return (
    <Select disabled={disabled} {...selectProps}>
      <Field
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
        orientation={orientation}
      >
        <FieldLabel htmlFor={triggerId} className={textFieldLabelClassName}>
          {label}
        </FieldLabel>
        <FieldContent>
          <SelectTrigger
            id={triggerId}
            size={size}
            aria-invalid={ariaInvalidProp ?? invalid}
            aria-describedby={ariaDescribedBy || undefined}
            className={cn('w-full min-w-0', triggerClassName)}
            data-testid={dataTestId}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent
            {...contentProps}
            position={contentProps?.position ?? 'popper'}
            className={cn(
              'w-[var(--radix-select-trigger-width)]',
              contentClassName,
              contentProps?.className,
            )}
          >
            {children}
          </SelectContent>
          {description ? (
            <FieldDescription
              id={descriptionId}
              className={textFieldDescriptionClassName}
            >
              {description}
            </FieldDescription>
          ) : null}
          <FieldError
            id={errorId}
            className={textFieldErrorClassName}
            errors={errorText ? undefined : errors}
          >
            {errorText ?? undefined}
          </FieldError>
        </FieldContent>
      </Field>
    </Select>
  );
}

export { SelectGroup } from './components/SelectGroup';
export { SelectItem } from './components/SelectItem';
export { SelectLabel } from './components/SelectLabel';
export { SelectSeparator } from './components/SelectSeparator';
