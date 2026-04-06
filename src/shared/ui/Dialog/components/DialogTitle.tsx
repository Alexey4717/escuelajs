'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import { cn } from '../../../lib/styles/cn';
import { DIALOG_SLOT } from '../constants';
import type { DialogTitleProps } from '../types';

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot={DIALOG_SLOT.title}
      className={cn(
        'font-heading text-base leading-none font-medium',
        className,
      )}
      {...props}
    />
  );
}
