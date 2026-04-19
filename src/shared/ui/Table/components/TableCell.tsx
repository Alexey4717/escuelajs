import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { tableCellClassName } from '../classNames';

export const TableCell = ({ className, ...props }: ComponentProps<'td'>) => (
  <td
    data-slot="table-cell"
    className={cn(tableCellClassName, className)}
    {...props}
  />
);
