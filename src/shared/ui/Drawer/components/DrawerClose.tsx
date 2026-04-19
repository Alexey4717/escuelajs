'use client';

import { Drawer as DrawerPrimitive } from 'vaul';

import { DRAWER_SLOT } from '../constants';
import type { DrawerCloseProps } from '../types';

export const DrawerClose = (props: DrawerCloseProps) => (
  <DrawerPrimitive.Close data-slot={DRAWER_SLOT.close} {...props} />
);
