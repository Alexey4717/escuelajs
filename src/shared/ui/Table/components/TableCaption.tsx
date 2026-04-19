import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { tableCaptionClassName } from '../classNames';

export const TableCaption = ({
  className,
  ...props
}: ComponentProps<'caption'>) => (
  <caption
    data-slot="table-caption"
    className={cn(tableCaptionClassName, className)}
    {...props}
  />
);
