import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { tableFooterClassName } from '../classNames';

export function TableFooter({ className, ...props }: ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(tableFooterClassName, className)}
      {...props}
    />
  );
}
