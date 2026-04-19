'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import type { ComboboxRootProps } from '../types';

export const ComboboxRoot = ({ ...props }: ComboboxRootProps) => (
  <ComboboxPrimitive.Root data-slot="combobox-root" {...props} />
);
