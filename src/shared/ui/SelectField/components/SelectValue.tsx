'use client';

import { type ComponentProps } from 'react';

import { Select as SelectPrimitive } from 'radix-ui';

export const SelectValue = ({
  ...props
}: ComponentProps<typeof SelectPrimitive.Value>) => (
  <SelectPrimitive.Value data-slot="select-value" {...props} />
);
