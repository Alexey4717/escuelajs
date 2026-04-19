'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '../../../lib/styles/cn';
import type { ComboboxTriggerProps } from '../types';

export const ComboboxTrigger = ({
  className,
  children,
  ...props
}: ComboboxTriggerProps) => (
  <ComboboxPrimitive.Trigger
    data-slot="combobox-trigger"
    className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
    {...props}
  >
    {children}
    <ChevronDownIcon
      className="pointer-events-none size-4 text-muted-foreground"
      aria-hidden
    />
  </ComboboxPrimitive.Trigger>
);
