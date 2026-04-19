'use client';

import { type ComponentProps } from 'react';

import { Select as SelectPrimitive } from 'radix-ui';

import { cn } from '../../../lib/styles/cn';

export const SelectGroup = ({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.Group>) => (
  <SelectPrimitive.Group
    data-slot="select-group"
    className={cn('scroll-my-1 p-1', className)}
    {...props}
  />
);
