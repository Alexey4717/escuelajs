'use client';

import { type ComponentProps } from 'react';

import { Select as SelectPrimitive } from 'radix-ui';

import { cn } from '../../../lib/styles/cn';

export const SelectLabel = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Label>) => (
  <SelectPrimitive.Label
    data-slot="select-label"
    className={cn('px-1.5 py-1 text-xs text-muted-foreground', className)}
    {...props}
  />
);
