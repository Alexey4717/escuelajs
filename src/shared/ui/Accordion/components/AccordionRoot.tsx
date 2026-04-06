'use client';

import { Accordion as AccordionPrimitive } from 'radix-ui';

import { cn } from '../../../lib/styles/cn';
import { ACCORDION_SLOT } from '../constants';
import type { AccordionRootProps } from '../types';

export function AccordionRoot({ className, ...props }: AccordionRootProps) {
  return (
    <AccordionPrimitive.Root
      data-slot={ACCORDION_SLOT.root}
      className={cn('flex w-full flex-col', className)}
      {...props}
    />
  );
}
