import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { tableBodyClassName } from '../classNames';

export const TableBody = ({ className, ...props }: ComponentProps<'tbody'>) => (
  <tbody
    data-slot="table-body"
    className={cn(tableBodyClassName, className)}
    {...props}
  />
);
