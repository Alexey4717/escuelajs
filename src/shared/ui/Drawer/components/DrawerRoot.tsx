'use client';

import { Drawer as DrawerPrimitive } from 'vaul';

import { DRAWER_SLOT } from '../constants';
import type { DrawerRootProps } from '../types';

export const DrawerRoot = (props: DrawerRootProps) => (
  <DrawerPrimitive.Root data-slot={DRAWER_SLOT.root} {...props} />
);
