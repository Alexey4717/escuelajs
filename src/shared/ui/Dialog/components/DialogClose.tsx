'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import { DIALOG_SLOT } from '../constants';
import type { DialogCloseProps } from '../types';

export function DialogClose(props: DialogCloseProps) {
  return <DialogPrimitive.Close data-slot={DIALOG_SLOT.close} {...props} />;
}
