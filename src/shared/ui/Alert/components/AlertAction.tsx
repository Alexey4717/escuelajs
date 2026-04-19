import { cn } from '../../../lib/styles/cn';
import { ALERT_SLOT } from '../constants';
import type { AlertActionProps } from '../types';

export const AlertAction = ({ className, ...props }: AlertActionProps) => (
  <div
    data-slot={ALERT_SLOT.action}
    className={cn('absolute top-2 right-2', className)}
    {...props}
  />
);
