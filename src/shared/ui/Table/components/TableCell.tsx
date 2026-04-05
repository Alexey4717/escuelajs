import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { tableCellClassName } from '../classNames';

export function TableCell({ className, ...props }: ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(tableCellClassName, className)}
      {...props}
    />
  );
}
