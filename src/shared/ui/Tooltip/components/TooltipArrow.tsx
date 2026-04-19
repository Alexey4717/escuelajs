'use client';

import { type ComponentProps } from 'react';

import { Tooltip as TooltipPrimitive } from 'radix-ui';

import { cn } from '../../../lib/styles/cn';

export const TooltipArrow = ({
  className,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Arrow>) => (
  <TooltipPrimitive.Arrow
    className={cn(
      'z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground',
      className,
    )}
    {...props}
  />
);
