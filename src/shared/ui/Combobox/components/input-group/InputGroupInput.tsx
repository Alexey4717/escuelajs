'use client';

import { type ComponentProps } from 'react';

import { cn } from '../../../../lib/styles/cn';
import { Input } from '../../../TextField/components/Input';

export const InputGroupInput = ({
  className,
  ...props
}: ComponentProps<'input'>) => (
  <Input
    data-slot="input-group-control"
    className={cn(
      'flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent',
      className,
    )}
    {...props}
  />
);
