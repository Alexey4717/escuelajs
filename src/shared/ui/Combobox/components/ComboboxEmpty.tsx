'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import { cn } from '../../../lib/styles/cn';
import type { ComboboxEmptyProps } from '../types';

export function ComboboxEmpty({ className, ...props }: ComboboxEmptyProps) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        'hidden w-full justify-center py-2 text-center text-sm text-muted-foreground group-data-empty/combobox-content:flex',
        className,
      )}
      {...props}
    />
  );
}
