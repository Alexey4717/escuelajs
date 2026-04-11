'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import { cn } from '../../../lib/styles/cn';
import { comboboxListClassName } from '../constants';
import type { ComboboxListProps } from '../types';

export function ComboboxList({ className, ...props }: ComboboxListProps) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(comboboxListClassName, className)}
      {...props}
    />
  );
}
