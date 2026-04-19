'use client';

import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '../../../lib/styles/cn';
import { DRAWER_SLOT } from '../constants';
import type { DrawerContentComponentProps } from '../types';
import { DrawerOverlay } from './DrawerOverlay';
import { DrawerPortal } from './DrawerPortal';

export const DrawerContent = ({
  className,
  children,
  overlayProps,
  showOverlay = true,
  showHandle = true,
  ...props
}: DrawerContentComponentProps) => (
  <DrawerPortal>
    {showOverlay && <DrawerOverlay {...overlayProps} />}
    <DrawerPrimitive.Content
      data-slot={DRAWER_SLOT.content}
      className={cn(
        'group/drawer-content fixed z-50 flex h-auto flex-col bg-popover text-sm text-popover-foreground data-[vaul-drawer-direction=bottom]:inset-x-2 data-[vaul-drawer-direction=bottom]:bottom-2 data-[vaul-drawer-direction=bottom]:mt-24 data-[vaul-drawer-direction=bottom]:max-h-[80vh] data-[vaul-drawer-direction=bottom]:rounded-xl data-[vaul-drawer-direction=bottom]:border data-[vaul-drawer-direction=left]:inset-y-2 data-[vaul-drawer-direction=left]:left-2 data-[vaul-drawer-direction=left]:w-3/4 data-[vaul-drawer-direction=left]:rounded-xl data-[vaul-drawer-direction=left]:border data-[vaul-drawer-direction=right]:inset-y-2 data-[vaul-drawer-direction=right]:right-2 data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:rounded-xl data-[vaul-drawer-direction=right]:border data-[vaul-drawer-direction=top]:inset-x-2 data-[vaul-drawer-direction=top]:top-2 data-[vaul-drawer-direction=top]:mb-24 data-[vaul-drawer-direction=top]:max-h-[80vh] data-[vaul-drawer-direction=top]:rounded-xl data-[vaul-drawer-direction=top]:border data-[vaul-drawer-direction=left]:sm:max-w-sm data-[vaul-drawer-direction=right]:sm:max-w-sm',
        className,
      )}
      {...props}
    >
      {showHandle && (
        <div
          data-slot={DRAWER_SLOT.handle}
          className="mx-auto mt-4 hidden h-1 w-[100px] shrink-0 rounded-full bg-muted group-data-[vaul-drawer-direction=bottom]/drawer-content:block"
        />
      )}
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
);
