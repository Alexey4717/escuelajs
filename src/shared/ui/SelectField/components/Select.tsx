'use client';

import { type ComponentProps } from 'react';

import { Select as SelectPrimitive } from 'radix-ui';

export const Select = ({
  ...props
}: ComponentProps<typeof SelectPrimitive.Root>) => (
  <SelectPrimitive.Root data-slot="select" {...props} />
);
