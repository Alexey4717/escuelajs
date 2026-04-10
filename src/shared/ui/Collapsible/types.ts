import type { ComponentProps, ReactNode } from 'react';

import { Collapsible as CollapsiblePrimitive } from 'radix-ui';

export type CollapsibleRootProps = ComponentProps<
  typeof CollapsiblePrimitive.Root
>;

export type CollapsibleTriggerProps = ComponentProps<
  typeof CollapsiblePrimitive.CollapsibleTrigger
>;

export type CollapsibleContentProps = ComponentProps<
  typeof CollapsiblePrimitive.CollapsibleContent
>;

/**
 * Пропсы корневого компонента `Collapsible`: все пропсы Radix `Root` плюс опциональные `trigger` и `content`
 * для упрощённого режима.
 */
export type CollapsibleProps = CollapsibleRootProps & {
  /**
   * Упрощённый режим: задаётся вместе с `content`. Если оба заданы, `children` игнорируется.
   *
   * @example
   * ```tsx
   * <Collapsible trigger={<span>Заголовок</span>} content={<p>Текст</p>} />
   * ```
   */
  trigger?: ReactNode;
  /**
   * Пара к `trigger` в упрощённом режиме.
   *
   * @example
   * ```tsx
   * <Collapsible trigger="Раздел" content={<div>Подробности</div>} />
   * ```
   */
  content?: ReactNode;
};
