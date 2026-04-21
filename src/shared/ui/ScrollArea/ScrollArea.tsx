'use client';

import { type ComponentProps, forwardRef } from 'react';

import { ScrollArea as ScrollAreaPrimitive } from 'radix-ui';

import { cn } from '../../lib/styles/cn';

export const ScrollArea = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof ScrollAreaPrimitive.Root>
>(({ className, children, type = 'auto', ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    data-slot="scroll-area"
    className={cn('relative', className)}
    type={type}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport
      ref={ref}
      data-slot="scroll-area-viewport"
      className="size-full rounded-[inherit] [overflow-anchor:none] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1"
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));

ScrollArea.displayName = 'ScrollArea';

export const ScrollBar = ({
  className,
  orientation = 'vertical',
  ...props
}: ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    data-slot="scroll-area-scrollbar"
    data-orientation={orientation}
    orientation={orientation}
    className={cn(
      'flex touch-none p-px transition-colors select-none data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent',
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      data-slot="scroll-area-thumb"
      className="relative flex-1 rounded-full bg-border"
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
);
