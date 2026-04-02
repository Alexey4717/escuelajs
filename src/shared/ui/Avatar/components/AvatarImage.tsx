'use client';

import { type ComponentProps } from 'react';

import { Avatar as AvatarPrimitive } from 'radix-ui';

import { cn } from '../../../lib/styles/cn';

export function AvatarImage({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        'aspect-square size-full rounded-full object-cover',
        className,
      )}
      {...props}
    />
  );
}
