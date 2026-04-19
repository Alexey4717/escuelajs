'use client';

import { type ComponentProps } from 'react';

import { Avatar as AvatarPrimitive } from 'radix-ui';

import { cn } from '../../../lib/styles/cn';

export const AvatarFallback = ({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Fallback>) => (
  <AvatarPrimitive.Fallback
    data-slot="avatar-fallback"
    className={cn(
      'flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs',
      className,
    )}
    {...props}
  />
);
