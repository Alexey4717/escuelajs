'use client';

import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';

export const SidebarContent = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    data-slot="sidebar-content"
    data-sidebar="content"
    className={cn(
      'no-scrollbar flex min-h-0 flex-1 flex-col gap-0 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
      className,
    )}
    {...props}
  />
);
