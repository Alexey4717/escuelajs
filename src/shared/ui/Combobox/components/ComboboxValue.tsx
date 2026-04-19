'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import type { ComboboxValueProps } from '../types';

export const ComboboxValue = ({ ...props }: ComboboxValueProps) => (
  <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
);
