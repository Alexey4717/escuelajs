import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { tableContainerClassName } from '../classNames';

export const TableContainer = ({
  className,
  ...props
}: ComponentProps<'div'>) => (
  <div
    data-slot="table-container"
    className={cn(tableContainerClassName, className)}
    {...props}
  />
);
