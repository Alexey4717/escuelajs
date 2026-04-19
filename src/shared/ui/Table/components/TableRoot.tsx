import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { tableRootClassName } from '../classNames';

export const TableRoot = ({ className, ...props }: ComponentProps<'table'>) => (
  <table
    data-slot="table"
    className={cn(tableRootClassName, className)}
    {...props}
  />
);
