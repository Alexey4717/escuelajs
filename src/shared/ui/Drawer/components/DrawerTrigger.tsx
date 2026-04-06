'use client';

import { Drawer as DrawerPrimitive } from 'vaul';

import { DRAWER_SLOT } from '../constants';
import type { DrawerTriggerProps } from '../types';

export function DrawerTrigger(props: DrawerTriggerProps) {
  return <DrawerPrimitive.Trigger data-slot={DRAWER_SLOT.trigger} {...props} />;
}
