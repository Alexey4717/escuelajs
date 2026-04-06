'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import { cn } from '../../../lib/styles/cn';
import { DIALOG_SLOT } from '../constants';
import type { DialogDescriptionProps } from '../types';

export function DialogDescription({
  className,
  ...props
}: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot={DIALOG_SLOT.description}
      className={cn(
        'text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground',
        className,
      )}
      {...props}
    />
  );
}
