'use client';

import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';

export const SidebarGroupContent = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    data-slot="sidebar-group-content"
    data-sidebar="group-content"
    className={cn('w-full text-sm', className)}
    {...props}
  />
);
