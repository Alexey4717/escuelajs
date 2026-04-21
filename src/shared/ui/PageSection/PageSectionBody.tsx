import { type ComponentPropsWithoutRef } from 'react';

import { cn } from '../../lib/styles/cn';

export const PageSectionBody = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'div'>) => (
  <div className={cn('mt-10', className)} {...props}>
    {children}
  </div>
);
