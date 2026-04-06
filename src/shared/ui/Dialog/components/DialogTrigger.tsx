'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import { DIALOG_SLOT } from '../constants';
import type { DialogTriggerProps } from '../types';

export function DialogTrigger(props: DialogTriggerProps) {
  return <DialogPrimitive.Trigger data-slot={DIALOG_SLOT.trigger} {...props} />;
}
