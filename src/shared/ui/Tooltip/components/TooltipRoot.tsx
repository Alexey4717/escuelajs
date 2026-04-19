'use client';

import { type ComponentProps } from 'react';

import { Tooltip as TooltipPrimitive } from 'radix-ui';

export const TooltipRoot = ({
  ...props
}: ComponentProps<typeof TooltipPrimitive.Root>) => (
  <TooltipPrimitive.Root data-slot="tooltip" {...props} />
);
