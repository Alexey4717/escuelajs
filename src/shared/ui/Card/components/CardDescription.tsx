import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';

export function CardDescription({
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}
