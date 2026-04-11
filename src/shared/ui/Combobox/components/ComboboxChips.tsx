'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import { cn } from '../../../lib/styles/cn';
import { comboboxChipsClassName } from '../constants';
import type { ComboboxChipsProps } from '../types';

export function ComboboxChips({ className, ...props }: ComboboxChipsProps) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="combobox-chips"
      className={cn(comboboxChipsClassName, className)}
      {...props}
    />
  );
}
