'use client';

import { type ComponentProps } from 'react';

import { type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '../../../lib/styles/cn';
import { TooltipContent } from '../../Tooltip/components/TooltipContent';
import { Tooltip } from '../../Tooltip/Tooltip';
import { useSidebar } from '../sidebar-context';
import { sidebarMenuButtonVariants } from './sidebar-menu-button-variants';

export function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  className,
  ...props
}: ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot.Root : 'button';
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  const tooltipProps: React.ComponentProps<typeof TooltipContent> =
    typeof tooltip === 'string' ? { children: tooltip } : tooltip;

  const { children: tooltipLabel, ...tooltipRest } = tooltipProps;

  return (
    <Tooltip
      trigger={button}
      triggerProps={{ asChild: true }}
      content={tooltipLabel}
      contentProps={{
        side: 'right',
        align: 'center',
        hidden: state !== 'collapsed' || isMobile,
        ...tooltipRest,
      }}
    />
  );
}
