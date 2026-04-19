import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { tableHeadClassName } from '../classNames';

export const TableHead = ({ className, ...props }: ComponentProps<'th'>) => (
  <th
    data-slot="table-head"
    className={cn(tableHeadClassName, className)}
    {...props}
  />
);
