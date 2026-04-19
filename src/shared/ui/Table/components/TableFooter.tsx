import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { tableFooterClassName } from '../classNames';

export const TableFooter = ({
  className,
  ...props
}: ComponentProps<'tfoot'>) => (
  <tfoot
    data-slot="table-footer"
    className={cn(tableFooterClassName, className)}
    {...props}
  />
);
