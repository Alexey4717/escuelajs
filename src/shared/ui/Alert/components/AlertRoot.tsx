import { cn } from '../../../lib/styles/cn';
import { ALERT_SLOT, alertVariants } from '../constants';
import type { AlertRootProps } from '../types';

export const AlertRoot = ({ className, variant, ...props }: AlertRootProps) => (
  <div
    data-slot={ALERT_SLOT.root}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
);
