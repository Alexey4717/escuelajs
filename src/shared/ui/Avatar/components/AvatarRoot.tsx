'use client';

import { type ComponentProps } from 'react';

import { Avatar as AvatarPrimitive } from 'radix-ui';

import { cn } from '../../../lib/styles/cn';

export const AvatarRoot = ({
  className,
  size = 'default',
  ...props
}: ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: 'default' | 'sm' | 'lg';
}) => (
  <AvatarPrimitive.Root
    data-slot="avatar"
    data-size={size}
    className={cn(
      'group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten',
      className,
    )}
    {...props}
  />
);
