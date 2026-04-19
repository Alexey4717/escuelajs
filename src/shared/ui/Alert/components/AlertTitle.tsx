import { cn } from '../../../lib/styles/cn';
import { ALERT_SLOT } from '../constants';
import type { AlertTitleProps } from '../types';

export const AlertTitle = ({ className, ...props }: AlertTitleProps) => (
  <div
    data-slot={ALERT_SLOT.title}
    className={cn(
      'font-heading font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground',
      className,
    )}
    {...props}
  />
);
