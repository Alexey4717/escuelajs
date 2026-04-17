'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { XIcon } from 'lucide-react';

import { cn } from '../../../lib/styles/cn';
import type { ComboboxClearProps } from '../types';
import { InputGroupButton } from './input-group/InputGroupButton';

export function ComboboxClear({ className, ...props }: ComboboxClearProps) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <XIcon className="pointer-events-none" aria-hidden />
      <span className="sr-only">Clear</span>
    </ComboboxPrimitive.Clear>
  );
}
