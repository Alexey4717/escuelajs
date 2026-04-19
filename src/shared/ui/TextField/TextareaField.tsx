'use client';

import { type ComponentProps, useId } from 'react';

import { cn } from '../../lib/styles/cn';
import {
  textFieldDescriptionClassName,
  textFieldErrorClassName,
  textFieldLabelClassName,
  textFieldTextareaClassName,
} from './classNames';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from './components/Field';
import { Textarea } from './components/Textarea';

export type TextareaFieldProps = Omit<
  ComponentProps<'textarea'>,
  'id' | 'className'
> & {
  id?: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  errorText?: string;
  errors?: Array<{ message?: string } | undefined>;
  'data-testid'?: string;
} & Pick<ComponentProps<typeof Field>, 'orientation'>;

export const TextareaField = ({
  id: idProp,
  label,
  description,
  errorText,
  errors,
  orientation = 'vertical',
  disabled,
  'aria-describedby': ariaDescribedByProp,
  'aria-invalid': ariaInvalidProp,
  ...textareaProps
}: TextareaFieldProps) => {
  const generatedId = useId();
  const controlId = idProp ?? generatedId;
  const descriptionId = description ? `${controlId}-description` : undefined;
  const hasVisibleError =
    Boolean(errorText) || Boolean(errors?.some((e) => e?.message));
  const invalid = hasVisibleError || ariaInvalidProp === true;
  const errorId = hasVisibleError ? `${controlId}-error` : undefined;

  const ariaDescribedBy = [ariaDescribedByProp, descriptionId, errorId]
    .filter(Boolean)
    .join(' ');

  return (
    <Field
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      orientation={orientation}
    >
      <FieldLabel htmlFor={controlId} className={textFieldLabelClassName}>
        {label}
      </FieldLabel>
      <FieldContent>
        <Textarea
          id={controlId}
          disabled={disabled}
          aria-invalid={ariaInvalidProp ?? invalid}
          aria-describedby={ariaDescribedBy || undefined}
          className={cn(textFieldTextareaClassName)}
          {...textareaProps}
        />
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
};
