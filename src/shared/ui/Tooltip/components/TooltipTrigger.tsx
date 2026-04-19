'use client';

import { type ComponentProps } from 'react';

import { Tooltip as TooltipPrimitive } from 'radix-ui';

export const TooltipTrigger = ({
  ...props
}: ComponentProps<typeof TooltipPrimitive.Trigger>) => (
  <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
);
