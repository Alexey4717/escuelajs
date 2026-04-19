'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import { cn } from '../../../lib/styles/cn';
import type { ComboboxChipsInputProps } from '../types';

export const ComboboxChipsInput = ({
  className,
  ...props
}: ComboboxChipsInputProps) => (
  <ComboboxPrimitive.Input
    data-slot="combobox-chip-input"
    className={cn('min-w-16 flex-1 outline-none', className)}
    {...props}
  />
);
