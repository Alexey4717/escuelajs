import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { tableRootClassName } from '../classNames';

export function TableRoot({ className, ...props }: ComponentProps<'table'>) {
  return (
    <table
      data-slot="table"
      className={cn(tableRootClassName, className)}
      {...props}
    />
  );
}
