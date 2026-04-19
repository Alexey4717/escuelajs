'use client';

import { type ComponentProps } from 'react';

import { Dialog as SheetPrimitive } from 'radix-ui';

import { cn } from '../../../lib/styles/cn';

export const SheetTitle = ({
  className,
  ...props
}: ComponentProps<typeof SheetPrimitive.Title>) => (
  <SheetPrimitive.Title
    data-slot="sheet-title"
    className={cn(
      'font-heading text-base font-medium text-foreground',
      className,
    )}
    {...props}
  />
);
