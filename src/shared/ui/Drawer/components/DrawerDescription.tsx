'use client';

import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '../../../lib/styles/cn';
import { DRAWER_SLOT } from '../constants';
import type { DrawerDescriptionProps } from '../types';

export const DrawerDescription = ({
  className,
  ...props
}: DrawerDescriptionProps) => (
  <DrawerPrimitive.Description
    data-slot={DRAWER_SLOT.description}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
);
