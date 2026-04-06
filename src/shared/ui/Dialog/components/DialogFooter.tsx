'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import { cn } from '../../../lib/styles/cn';
import { Button } from '../../Button/Button';
import { DIALOG_SLOT } from '../constants';
import type { DialogFooterProps } from '../types';

export function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: DialogFooterProps) {
  return (
    <div
      data-slot={DIALOG_SLOT.footer}
      className={cn(
        '-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 sm:flex-row sm:justify-end',
        className,
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close asChild>
          <Button variant="outline">Close</Button>
        </DialogPrimitive.Close>
      )}
    </div>
  );
}
