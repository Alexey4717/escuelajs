'use client';

import { Collapsible as CollapsiblePrimitive } from 'radix-ui';

import { cn } from '../../../lib/styles/cn';
import { COLLAPSIBLE_SLOT } from '../constants';
import type { CollapsibleRootProps } from '../types';

/**
 * Корень Radix Collapsible (`Root`). Обычно внутри компонента `Collapsible` из `Collapsible.tsx` или вместе с
 * `CollapsibleTrigger` и `CollapsibleContent`.
 *
 * @example
 * ```tsx
 * <CollapsibleRoot defaultOpen>
 *   <CollapsibleTrigger>Заголовок</CollapsibleTrigger>
 *   <CollapsibleContent>Текст</CollapsibleContent>
 * </CollapsibleRoot>
 * ```
 */
export function CollapsibleRoot({ className, ...props }: CollapsibleRootProps) {
  return (
    <CollapsiblePrimitive.Root
      data-slot={COLLAPSIBLE_SLOT.root}
      className={cn('w-full', className)}
      {...props}
    />
  );
}
