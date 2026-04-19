'use client';

import { cn } from '../../../lib/styles/cn';
import { DIALOG_SLOT } from '../constants';
import type { DialogHeaderProps } from '../types';

export const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <div
    data-slot={DIALOG_SLOT.header}
    className={cn('flex flex-col gap-2', className)}
    {...props}
  />
);
