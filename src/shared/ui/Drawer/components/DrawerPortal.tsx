'use client';

import { Drawer as DrawerPrimitive } from 'vaul';

import { DRAWER_SLOT } from '../constants';
import type { DrawerPortalProps } from '../types';

export function DrawerPortal(props: DrawerPortalProps) {
  return <DrawerPrimitive.Portal data-slot={DRAWER_SLOT.portal} {...props} />;
}
