'use client';

import { type ComponentProps } from 'react';

import { Dialog as SheetPrimitive } from 'radix-ui';

export const SheetClose = ({
  ...props
}: ComponentProps<typeof SheetPrimitive.Close>) => (
  <SheetPrimitive.Close data-slot="sheet-close" {...props} />
);
