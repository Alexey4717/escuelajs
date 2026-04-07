import { cn } from '../../../lib/styles/cn';
import { ALERT_SLOT, alertVariants } from '../constants';
import type { AlertRootProps } from '../types';

export function AlertRoot({ className, variant, ...props }: AlertRootProps) {
  return (
    <div
      data-slot={ALERT_SLOT.root}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}
