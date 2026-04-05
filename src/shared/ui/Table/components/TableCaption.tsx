import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { tableCaptionClassName } from '../classNames';

export function TableCaption({
  className,
  ...props
}: ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(tableCaptionClassName, className)}
      {...props}
    />
  );
}
