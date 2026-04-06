'use client';

import { Accordion as AccordionPrimitive } from 'radix-ui';

import { cn } from '../../../lib/styles/cn';
import { ACCORDION_SLOT } from '../constants';
import type { AccordionContentProps } from '../types';

export function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  return (
    <AccordionPrimitive.Content
      data-slot={ACCORDION_SLOT.content}
      className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
      {...props}
    >
      <div
        className={cn(
          'h-(--radix-accordion-content-height) pt-0 pb-2.5 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4',
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}
