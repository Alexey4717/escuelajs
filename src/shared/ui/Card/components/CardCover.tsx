import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';

export function CardCover({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-cover"
      className={cn(
        'relative w-full shrink-0 overflow-hidden rounded-t-xl bg-muted',
        className,
      )}
      {...props}
    />
  );
}
