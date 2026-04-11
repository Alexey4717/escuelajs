'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import { cn } from '../../../lib/styles/cn';
import type { ComboboxGroupLabelProps } from '../types';

export function ComboboxGroupLabel({
  className,
  ...props
}: ComboboxGroupLabelProps) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-label"
      className={cn('px-2 py-1.5 text-xs text-muted-foreground', className)}
      {...props}
    />
  );
}
