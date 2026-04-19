'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { XIcon } from 'lucide-react';

import { cn } from '../../../lib/styles/cn';
import { Button } from '../../Button/Button';
import { comboboxChipClassName } from '../constants';
import type { ComboboxChipProps } from '../types';

export const ComboboxChip = ({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxChipProps) => (
  <ComboboxPrimitive.Chip
    data-slot="combobox-chip"
    className={cn(comboboxChipClassName, className)}
    {...props}
  >
    {children}
    {showRemove && (
      <ComboboxPrimitive.ChipRemove
        render={<Button variant="ghost" size="icon-xs" />}
        className="-ml-1 opacity-50 hover:opacity-100"
        data-slot="combobox-chip-remove"
      >
        <XIcon className="pointer-events-none" aria-hidden />
        <span className="sr-only">Remove</span>
      </ComboboxPrimitive.ChipRemove>
    )}
  </ComboboxPrimitive.Chip>
);
