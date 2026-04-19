'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import { DIALOG_SLOT } from '../constants';
import type { DialogRootProps } from '../types';

export const DialogRoot = (props: DialogRootProps) => (
  <DialogPrimitive.Root data-slot={DIALOG_SLOT.root} {...props} />
);
