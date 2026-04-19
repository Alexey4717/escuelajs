'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { CheckIcon } from 'lucide-react';

import { cn } from '../../../lib/styles/cn';
import { comboboxItemClassName } from '../constants';
import type { ComboboxItemProps } from '../types';

export const ComboboxItem = ({
  className,
  children,
  ...props
}: ComboboxItemProps) => (
  <ComboboxPrimitive.Item
    data-slot="combobox-item"
    className={cn(comboboxItemClassName, className)}
    {...props}
  >
    {children}
    <ComboboxPrimitive.ItemIndicator
      render={
        <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center" />
      }
    >
      <CheckIcon className="pointer-events-none" />
    </ComboboxPrimitive.ItemIndicator>
  </ComboboxPrimitive.Item>
);
