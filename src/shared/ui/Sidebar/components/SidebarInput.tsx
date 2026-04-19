'use client';

import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { Input } from '../../TextField/components/Input';

export const SidebarInput = ({
  className,
  ...props
}: ComponentProps<typeof Input>) => (
  <Input
    data-slot="sidebar-input"
    data-sidebar="input"
    className={cn('h-8 w-full bg-background shadow-none', className)}
    {...props}
  />
);
