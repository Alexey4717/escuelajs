import type { ZodObject } from 'zod/v4';

import type { SelectOption } from './types';

/**
 * UI-метаданные поля формы, хранятся в {@link ZodType.meta} под ключом `formField`
 * (см. расширение {@link GlobalMeta}).
 *
 * Поля вроде `options` используются {@link createRHFSelect}; для текстовых полей игнорируются.
 */
export type ZodFormFieldUiMeta = {
  label?: string;
  'data-testid'?: string;
  /** {@link createRHFSelect} / {@link createRHFCombobox}: пункты списка (как у `SelectField` / `options` в RHF). */
  options?: SelectOption[];
  placeholder?: string;
  description?: string;
  size?: 'sm' | 'default';
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
  triggerClassName?: string;
  contentClassName?: string;
};

declare module 'zod/v4/core' {
  export interface GlobalMeta {
    /** Подпись, test id, опции селекта/комбобокса и др. для {@link createRHFTextField} / {@link createRHFSelect} / {@link createRHFCombobox} */
    formField?: ZodFormFieldUiMeta;
  }
}

/**
 * Читает `formField` из meta поля объекта Zod (после `.meta({ formField: … })`).
 */
export function getZodFormFieldUiMeta<
  TSchema extends ZodObject,
  K extends keyof TSchema['shape'] & string,
>(schema: TSchema, key: K): ZodFormFieldUiMeta | undefined {
  return schema.shape[key].meta()?.formField;
}
