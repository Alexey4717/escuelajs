'use client';

import { type ComponentProps, useId } from 'react';

import { cn } from '../../lib/styles/cn';
import { Spinner } from '../Spinner/Spinner';
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
import { ComboboxContent } from './components/ComboboxContent';
import { ComboboxEmpty } from './components/ComboboxEmpty';
import { ComboboxInput } from './components/ComboboxInput';
import { ComboboxItem } from './components/ComboboxItem';
import { ComboboxList } from './components/ComboboxList';
import { ComboboxRoot } from './components/ComboboxRoot';
import type { ComboboxOption, ComboboxRootProps } from './types';

export type { ComboboxOption };

export type ComboboxProps<TValue extends string = string> = Omit<
  ComboboxRootProps,
  'items' | 'children' | 'multiple'
> & {
  id?: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  /** Одна строка ошибки; если задано, показывается вместо `errors`. */
  errorText?: string;
  /** Несколько ошибок (например, из GraphQL / zod). */
  errors?: Array<{ message?: string } | undefined>;
  options: ComboboxOption<TValue>[];
  placeholder?: string;
  emptyText?: string;
  showClear?: boolean;
  showTrigger?: boolean;
  triggerClassName?: string;
  contentClassName?: string;
  contentProps?: Omit<ComponentProps<typeof ComboboxContent>, 'children'>;
  listClassName?: string;
  /** Атрибут для тестирования. Пробрасывается на поле ввода. */
  'data-testid'?: string;
  /** Показать индикатор загрузки вместо списка опций (выпадающая панель). */
  listLoading?: boolean;
} & Pick<ComponentProps<typeof Field>, 'orientation'> &
  Pick<
    ComponentProps<typeof ComboboxInput>,
    'aria-describedby' | 'aria-invalid'
  >;

/**
 * Поле с выпадающим списком и фильтрацией по вводу (Base UI Combobox).
 * Подпись, описание и ошибки оформлены через общий `Field`, как у `SelectField`.
 *
 * @example
 * ```tsx
 * import { useState } from 'react';
 *
 * import { Combobox } from '@/shared/ui/Combobox/Combobox';
 *
 * const cities = [
 *   { value: 'nyc', label: 'New York' },
 *   { value: 'lon', label: 'London' },
 * ] as const;
 *
 * export function CityField() {
 *   const [city, setCity] = useState<string | undefined>();
 *
 *   return (
 *     <Combobox
 *       label="City"
 *       placeholder="Start typing a name…"
 *       options={cities}
 *       value={city}
 *       onValueChange={setCity}
 *       emptyText="No city found"
 *       showClear
 *     />
 *   );
 * }
 * ```
 */
export const Combobox = <TValue extends string = string>({
  id: idProp,
  label,
  description,
  errorText,
  errors,
  orientation = 'vertical',
  options,
  placeholder,
  emptyText = 'Nothing found',
  showClear = false,
  showTrigger = true,
  triggerClassName,
  contentClassName,
  contentProps,
  listClassName,
  'aria-describedby': ariaDescribedByProp,
  'aria-invalid': ariaInvalidProp,
  'data-testid': dataTestId,
  listLoading = false,
  disabled,
  ...rootProps
}: ComboboxProps<TValue>) => {
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
    <ComboboxRoot disabled={disabled} items={options} {...rootProps}>
      <Field
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
        orientation={orientation}
      >
        <FieldLabel htmlFor={triggerId} className={textFieldLabelClassName}>
          {label}
        </FieldLabel>
        <FieldContent>
          <ComboboxInput
            id={triggerId}
            placeholder={placeholder}
            disabled={disabled}
            showClear={showClear}
            showTrigger={showTrigger}
            className={cn('w-full min-w-0', triggerClassName)}
            aria-invalid={ariaInvalidProp ?? invalid}
            aria-describedby={ariaDescribedBy || undefined}
            data-testid={dataTestId}
          />
          <ComboboxContent
            {...contentProps}
            className={cn(contentClassName, contentProps?.className)}
          >
            {listLoading ? (
              <div className="flex justify-center py-6">
                <Spinner className="size-5 text-muted-foreground" />
              </div>
            ) : (
              <>
                <ComboboxList className={listClassName}>
                  {(item: ComboboxOption<TValue>) => (
                    <ComboboxItem
                      key={item.value}
                      value={item}
                      disabled={item.disabled}
                    >
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxList>
                <ComboboxEmpty>{emptyText}</ComboboxEmpty>
              </>
            )}
          </ComboboxContent>
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
    </ComboboxRoot>
  );
};
