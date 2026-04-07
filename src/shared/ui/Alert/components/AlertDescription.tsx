import { cn } from '../../../lib/styles/cn';
import { ALERT_SLOT } from '../constants';
import type { AlertDescriptionProps } from '../types';

export function AlertDescription({
  className,
  ...props
}: AlertDescriptionProps) {
  return (
    <div
      data-slot={ALERT_SLOT.description}
      className={cn(
        'text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4',
        className,
      )}
      {...props}
    />
  );
}
