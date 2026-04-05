import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { tableHeaderClassName } from '../classNames';

export function TableHeader({ className, ...props }: ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn(tableHeaderClassName, className)}
      {...props}
    />
  );
}
