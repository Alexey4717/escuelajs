import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';

export function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-4 group-data-[size=sm]/card:px-3', className)}
      {...props}
    />
  );
}
