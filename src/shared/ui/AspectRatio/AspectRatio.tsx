'use client';

import { type ComponentProps } from 'react';

import { AspectRatio as AspectRatioPrimitive } from 'radix-ui';

export const AspectRatio = ({
  ...props
}: ComponentProps<typeof AspectRatioPrimitive.Root>) => {
  return <AspectRatioPrimitive.Root data-slot="aspect-ratio" {...props} />;
};
