'use client';

import { Collapsible as CollapsiblePrimitive } from 'radix-ui';

import { cn } from '../../../lib/styles/cn';
import { COLLAPSIBLE_SLOT } from '../constants';
import type { CollapsibleContentProps } from '../types';

/**
 * Animated content region. Renders next to `CollapsibleTrigger` inside `CollapsibleRoot`.
 *
 * @example
 * ```tsx
 * <CollapsibleRoot defaultOpen>
 *   <CollapsibleTrigger>Section</CollapsibleTrigger>
 *   <CollapsibleContent className="pt-0">
 *     <p>Main content</p>
 *   </CollapsibleContent>
 * </CollapsibleRoot>
 * ```
 */
export const CollapsibleContent = ({
  className,
  children,
  ...props
}: CollapsibleContentProps) => (
  <CollapsiblePrimitive.CollapsibleContent
    data-slot={COLLAPSIBLE_SLOT.content}
    className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
    {...props}
  >
    <div
      className={cn(
        'pb-2.5 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4',
        className,
      )}
    >
      {children}
    </div>
  </CollapsiblePrimitive.CollapsibleContent>
);
