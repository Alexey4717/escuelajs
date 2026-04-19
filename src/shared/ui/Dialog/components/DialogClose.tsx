'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import { DIALOG_SLOT } from '../constants';
import type { DialogCloseProps } from '../types';

export const DialogClose = (props: DialogCloseProps) => (
  <DialogPrimitive.Close data-slot={DIALOG_SLOT.close} {...props} />
);
