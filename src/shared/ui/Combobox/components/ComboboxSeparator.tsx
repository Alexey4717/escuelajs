'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import { cn } from '../../../lib/styles/cn';
import type { ComboboxSeparatorProps } from '../types';

export const ComboboxSeparator = ({
  className,
  ...props
}: ComboboxSeparatorProps) => (
  <ComboboxPrimitive.Separator
    data-slot="combobox-separator"
    className={cn('-mx-1 my-1 h-px bg-border', className)}
    {...props}
  />
);
