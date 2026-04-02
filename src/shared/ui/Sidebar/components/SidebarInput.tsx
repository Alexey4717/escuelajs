'use client';

import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { Input } from '../../TextField/components/Input';

export function SidebarInput({
  className,
  ...props
}: ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn('h-8 w-full bg-background shadow-none', className)}
      {...props}
    />
  );
}
