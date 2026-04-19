import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { tableHeaderClassName } from '../classNames';

export const TableHeader = ({
  className,
  ...props
}: ComponentProps<'thead'>) => (
  <thead
    data-slot="table-header"
    className={cn(tableHeaderClassName, className)}
    {...props}
  />
);
