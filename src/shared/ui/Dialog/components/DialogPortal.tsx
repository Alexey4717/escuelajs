'use client';

import { Dialog as DialogPrimitive } from 'radix-ui';

import { DIALOG_SLOT } from '../constants';
import type { DialogPortalProps } from '../types';

export const DialogPortal = (props: DialogPortalProps) => (
  <DialogPrimitive.Portal data-slot={DIALOG_SLOT.portal} {...props} />
);
