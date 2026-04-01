import type { ReactNode } from 'react';

/**
 * Пункт списка для `createRHFSelect` (значения — строки, как в Radix Select).
 */
export type SelectOption<TValue extends string = string> = {
  label: ReactNode;
  value: TValue;
  disabled?: boolean;
  icon?: ReactNode;
};
