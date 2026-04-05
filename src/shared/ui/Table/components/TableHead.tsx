import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { tableHeadClassName } from '../classNames';

export function TableHead({ className, ...props }: ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(tableHeadClassName, className)}
      {...props}
    />
  );
}
