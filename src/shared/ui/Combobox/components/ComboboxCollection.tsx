'use client';

import { Combobox as ComboboxPrimitive } from '@base-ui/react';

import type { ComboboxCollectionProps } from '../types';

export const ComboboxCollection = ({ ...props }: ComboboxCollectionProps) => (
  <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
);
