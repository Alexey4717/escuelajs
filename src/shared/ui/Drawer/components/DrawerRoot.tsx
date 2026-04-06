'use client';

import { Drawer as DrawerPrimitive } from 'vaul';

import { DRAWER_SLOT } from '../constants';
import type { DrawerRootProps } from '../types';

export function DrawerRoot(props: DrawerRootProps) {
  return <DrawerPrimitive.Root data-slot={DRAWER_SLOT.root} {...props} />;
}
