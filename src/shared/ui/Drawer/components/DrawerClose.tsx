'use client';

import { Drawer as DrawerPrimitive } from 'vaul';

import { DRAWER_SLOT } from '../constants';
import type { DrawerCloseProps } from '../types';

export function DrawerClose(props: DrawerCloseProps) {
  return <DrawerPrimitive.Close data-slot={DRAWER_SLOT.close} {...props} />;
}
