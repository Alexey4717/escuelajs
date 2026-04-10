import type { ElementType, HTMLAttributes } from 'react';

import type { VariantProps } from 'class-variance-authority';

import { typographyVariants } from './typographyVariants';

export type TypographyVariant = NonNullable<
  VariantProps<typeof typographyVariants>['variant']
>;

export type TypographyAlign = NonNullable<
  VariantProps<typeof typographyVariants>['align']
>;

interface TypographyOwnProps {
  /** Визуальный стиль: заголовки, абзац и утилиты из shadcn Typography + аналоги MUI. */
  variant?: TypographyVariant;
  /** Выравнивание текста (как `align` в MUI). */
  align?: TypographyAlign;
  /** Отступ снизу (аналог `gutterBottom` в MUI). */
  gutterBottom?: boolean;
  /** Одна строка с обрезкой (аналог `noWrap` в MUI). */
  noWrap?: boolean;
  /** Переопределить корневой тег (аналог `component` в MUI). */
  component?: ElementType;
  /** Слить props и классы с дочерним элементом (Radix Slot). */
  asChild?: boolean;
}

export type TypographyProps = TypographyOwnProps &
  Omit<HTMLAttributes<HTMLElement>, keyof TypographyOwnProps>;
