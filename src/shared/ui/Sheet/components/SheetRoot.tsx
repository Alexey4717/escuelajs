'use client';

import { type ComponentProps } from 'react';

import { Dialog as SheetPrimitive } from 'radix-ui';

export const SheetRoot = ({
  ...props
}: ComponentProps<typeof SheetPrimitive.Root>) => (
  <SheetPrimitive.Root data-slot="sheet" {...props} />
);
