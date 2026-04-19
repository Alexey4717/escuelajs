'use client';

import { Accordion as AccordionPrimitive } from 'radix-ui';

import { cn } from '../../../lib/styles/cn';
import { ACCORDION_SLOT } from '../constants';
import type { AccordionItemProps } from '../types';

export const AccordionItem = ({ className, ...props }: AccordionItemProps) => (
  <AccordionPrimitive.Item
    data-slot={ACCORDION_SLOT.item}
    className={cn('not-last:border-b', className)}
    {...props}
  />
);
