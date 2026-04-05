import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { tableBodyClassName } from '../classNames';

export function TableBody({ className, ...props }: ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(tableBodyClassName, className)}
      {...props}
    />
  );
}
