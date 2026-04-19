'use client';

import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';

export const SheetFooter = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="sheet-footer"
    className={cn('mt-auto flex flex-col gap-2 p-4', className)}
    {...props}
  />
);
