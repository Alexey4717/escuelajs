'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import { cn } from '../../../lib/styles/cn';
import type { ComboboxGroupProps } from '../types';

export const ComboboxGroup = ({ className, ...props }: ComboboxGroupProps) => (
  <ComboboxPrimitive.Group
    data-slot="combobox-group"
    className={cn(className)}
    {...props}
  />
);
