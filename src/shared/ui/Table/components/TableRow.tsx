import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { tableRowClassName } from '../classNames';

export const TableRow = ({ className, ...props }: ComponentProps<'tr'>) => (
  <tr
    data-slot="table-row"
    className={cn(tableRowClassName, className)}
    {...props}
  />
);
