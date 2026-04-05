import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { tableContainerClassName } from '../classNames';

export function TableContainer({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="table-container"
      className={cn(tableContainerClassName, className)}
      {...props}
    />
  );
}
