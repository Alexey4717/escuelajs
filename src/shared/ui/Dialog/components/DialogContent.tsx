'use client';

import { XIcon } from 'lucide-react';
import { Dialog as DialogPrimitive } from 'radix-ui';

import { cn } from '../../../lib/styles/cn';
import { Button } from '../../Button/Button';
import { DIALOG_SLOT } from '../constants';
import type { DialogContentProps } from '../types';
import { DialogOverlay } from './DialogOverlay';
import { DialogPortal } from './DialogPortal';

export function DialogContent({
  className,
  children,
  showCloseButton = true,
  overlayProps,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay {...overlayProps} />
      <DialogPrimitive.Content
        data-slot={DIALOG_SLOT.content}
        className={cn(
          'fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-popover p-4 text-sm text-popover-foreground ring-1 ring-foreground/10 duration-100 outline-none sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot={DIALOG_SLOT.close} asChild>
            <Button
              variant="ghost"
              className="absolute top-2 right-2"
              size="icon-sm"
            >
              <XIcon />
              <span className="sr-only">Close</span>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}
