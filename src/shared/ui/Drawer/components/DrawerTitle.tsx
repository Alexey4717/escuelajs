'use client';

import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '../../../lib/styles/cn';
import { DRAWER_SLOT } from '../constants';
import type { DrawerTitleProps } from '../types';

export function DrawerTitle({ className, ...props }: DrawerTitleProps) {
  return (
    <DrawerPrimitive.Title
      data-slot={DRAWER_SLOT.title}
      className={cn(
        'font-heading text-base font-medium text-foreground',
        className,
      )}
      {...props}
    />
  );
}
