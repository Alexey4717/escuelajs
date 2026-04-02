'use client';

import { type ComponentProps } from 'react';

import { PanelLeftIcon } from 'lucide-react';

import { cn } from '../../../lib/styles/cn';
import { Button } from '../../Button/Button';
import { useSidebar } from '../sidebar-context';

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      className={cn(className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
