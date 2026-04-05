import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { tableRowClassName } from '../classNames';

export function TableRow({ className, ...props }: ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(tableRowClassName, className)}
      {...props}
    />
  );
}
