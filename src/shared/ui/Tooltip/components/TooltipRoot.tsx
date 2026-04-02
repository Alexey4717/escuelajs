'use client';

import { type ComponentProps } from 'react';

import { Tooltip as TooltipPrimitive } from 'radix-ui';

export function TooltipRoot({
  ...props
}: ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}
