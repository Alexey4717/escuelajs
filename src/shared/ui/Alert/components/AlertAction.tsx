import { cn } from '../../../lib/styles/cn';
import { ALERT_SLOT } from '../constants';
import type { AlertActionProps } from '../types';

export function AlertAction({ className, ...props }: AlertActionProps) {
  return (
    <div
      data-slot={ALERT_SLOT.action}
      className={cn('absolute top-2 right-2', className)}
      {...props}
    />
  );
}
