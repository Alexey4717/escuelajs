'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import { DIALOG_SLOT } from '../constants';
import type { DialogTriggerProps } from '../types';

export const DialogTrigger = (props: DialogTriggerProps) => (
  <DialogPrimitive.Trigger data-slot={DIALOG_SLOT.trigger} {...props} />
);
