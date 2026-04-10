'use client';

import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Collapsible as CollapsiblePrimitive } from 'radix-ui';

import { cn } from '../../../lib/styles/cn';
import { COLLAPSIBLE_SLOT } from '../constants';
import type { CollapsibleTriggerProps } from '../types';

/**
 * Кнопка раскрытия: наследует пропсы Radix `CollapsibleTrigger`, добавляет базовые стили и иконки chevron.
 * Должен находиться внутри `CollapsibleRoot` (или обёртки `Collapsible`).
 *
 * @example
 * ```tsx
 * <CollapsibleRoot>
 *   <CollapsibleTrigger className="text-left">Показать детали</CollapsibleTrigger>
 *   <CollapsibleContent>...</CollapsibleContent>
 * </CollapsibleRoot>
 * ```
 */
export function CollapsibleTrigger({
  className,
  children,
  ...props
}: CollapsibleTriggerProps) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot={COLLAPSIBLE_SLOT.trigger}
      className={cn(
        'group/collapsible-trigger relative flex w-full flex-1 items-start justify-between gap-2 rounded-lg border border-transparent py-2.5 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 **:data-[slot=collapsible-trigger-icon]:ml-auto **:data-[slot=collapsible-trigger-icon]:size-4 **:data-[slot=collapsible-trigger-icon]:text-muted-foreground',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        data-slot={COLLAPSIBLE_SLOT.triggerIcon}
        className="pointer-events-none shrink-0 group-aria-expanded/collapsible-trigger:hidden"
      />
      <ChevronUpIcon
        data-slot={COLLAPSIBLE_SLOT.triggerIcon}
        className="pointer-events-none hidden shrink-0 group-aria-expanded/collapsible-trigger:inline"
      />
    </CollapsiblePrimitive.CollapsibleTrigger>
  );
}
