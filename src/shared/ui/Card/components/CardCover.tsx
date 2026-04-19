import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';

export const CardCover = ({ className, ...props }: ComponentProps<'div'>) => (
  <div
    data-slot="card-cover"
    className={cn(
      'relative w-full shrink-0 overflow-hidden rounded-t-xl bg-muted',
      className,
    )}
    {...props}
  />
);
