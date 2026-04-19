'use client';

import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '../../../lib/styles/cn';
import { DRAWER_SLOT } from '../constants';
import type { DrawerTitleProps } from '../types';

export const DrawerTitle = ({ className, ...props }: DrawerTitleProps) => (
  <DrawerPrimitive.Title
    data-slot={DRAWER_SLOT.title}
    className={cn(
      'font-heading text-base font-medium text-foreground',
      className,
    )}
    {...props}
  />
);
