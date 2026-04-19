'use client';

import { cn } from '../../../lib/styles/cn';
import { DRAWER_SLOT } from '../constants';
import type { DrawerHeaderProps } from '../types';

export const DrawerHeader = ({ className, ...props }: DrawerHeaderProps) => (
  <div
    data-slot={DRAWER_SLOT.header}
    className={cn(
      'flex flex-col gap-0.5 p-4 group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center group-data-[vaul-drawer-direction=top]/drawer-content:text-center md:gap-0.5 md:text-left',
      className,
    )}
    {...props}
  />
);
