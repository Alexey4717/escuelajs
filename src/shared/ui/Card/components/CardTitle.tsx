import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';

export function CardTitle({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        'min-w-0 font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm',
        className,
      )}
      {...props}
    />
  );
}
