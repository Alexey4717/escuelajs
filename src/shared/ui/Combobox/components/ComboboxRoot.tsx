'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import type { ComboboxRootProps } from '../types';

export function ComboboxRoot({ ...props }: ComboboxRootProps) {
  return <ComboboxPrimitive.Root data-slot="combobox-root" {...props} />;
}
