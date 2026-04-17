'use client';

import { type ComponentProps, useId } from 'react';

import { cn } from '../../lib/styles/cn';
import { Spinner } from '../Spinner/Spinner';
import {
  textFieldDescriptionClassName,
  textFieldErrorClassName,
  textFieldInputClassName,
  textFieldLabelClassName,
} from './classNames';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from './components/Field';
import { Input } from './components/Input';

export type TextFieldProps = Omit<
  ComponentProps<'input'>,
  'id' | 'className'
> & {
  id?: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  /** Одна строка ошибки; если задано, показывается вместо `errors`. */
  errorText?: string;
  /** Несколько ошибок (например, из GraphQL / zod). */
  errors?: Array<{ message?: string } | undefined>;
  /** Атрибут для тестирования. Пробрасывается на нативный `<input />`. */
  'data-testid'?: string;
  /** Индикатор загрузки справа в поле (не меняет ширину соседних блоков). */
  loading?: boolean;
} & Pick<ComponentProps<typeof Field>, 'orientation'>;

export function TextField({
  id: idProp,
  label,
  description,
  errorText,
  errors,
  orientation = 'vertical',
  disabled,
  'aria-describedby': ariaDescribedByProp,
  'aria-invalid': ariaInvalidProp,
  loading = false,
  ...inputProps
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = idProp ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const hasVisibleError =
    Boolean(errorText) || Boolean(errors?.some((e) => e?.message));
  const invalid = hasVisibleError || ariaInvalidProp === true;
  const errorId = hasVisibleError ? `${inputId}-error` : undefined;

  const ariaDescribedBy = [ariaDescribedByProp, descriptionId, errorId]
    .filter(Boolean)
    .join(' ');

  return (
    <Field
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      orientation={orientation}
    >
      <FieldLabel htmlFor={inputId} className={textFieldLabelClassName}>
        {label}
      </FieldLabel>
      <FieldContent>
        <div className="relative w-full">
          <Input
            id={inputId}
            disabled={disabled}
            aria-invalid={ariaInvalidProp ?? invalid}
            aria-describedby={ariaDescribedBy || undefined}
            className={cn(textFieldInputClassName, loading && 'pr-9')}
            {...inputProps}
            aria-busy={loading ? true : inputProps['aria-busy']}
          />
          {loading ? (
            <span
              className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2"
              aria-hidden
            >
              <Spinner className="size-4 text-muted-foreground" />
            </span>
          ) : null}
        </div>
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
  );
}
