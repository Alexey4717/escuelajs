'use client';

import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { Separator } from '../../Separator/Separator';

export function SidebarSeparator({
  className,
  ...props
}: ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn('mx-2 w-auto bg-sidebar-border', className)}
      {...props}
    />
  );
}
