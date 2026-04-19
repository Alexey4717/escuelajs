'use client';

import { type ComponentProps } from 'react';

import { Dialog as SheetPrimitive } from 'radix-ui';

export const SheetTrigger = ({
  ...props
}: ComponentProps<typeof SheetPrimitive.Trigger>) => (
  <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
);
