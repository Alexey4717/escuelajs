'use client';

import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';

export const SidebarHeader = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    data-slot="sidebar-header"
    data-sidebar="header"
    className={cn('flex flex-col gap-2 p-2', className)}
    {...props}
  />
);
