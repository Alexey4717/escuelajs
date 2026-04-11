'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import type { ComboboxValueProps } from '../types';

export function ComboboxValue({ ...props }: ComboboxValueProps) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />;
}
