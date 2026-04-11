'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import type { ComboboxCollectionProps } from '../types';

export function ComboboxCollection({ ...props }: ComboboxCollectionProps) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  );
}
