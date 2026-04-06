'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import { DIALOG_SLOT } from '../constants';
import type { DialogRootProps } from '../types';

export function DialogRoot(props: DialogRootProps) {
  return <DialogPrimitive.Root data-slot={DIALOG_SLOT.root} {...props} />;
}
