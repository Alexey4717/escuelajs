'use client';

import { cn } from '../../../lib/styles/cn';
import { DRAWER_SLOT } from '../constants';
import type { DrawerFooterProps } from '../types';

export function DrawerFooter({ className, ...props }: DrawerFooterProps) {
  return (
    <div
      data-slot={DRAWER_SLOT.footer}
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  );
}
