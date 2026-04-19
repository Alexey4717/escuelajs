import { type ComponentProps } from 'react';

import { cn } from '../../../lib/styles/cn';
import { Separator } from '../../Separator/Separator';

export const ButtonGroupSeparator = ({
  className,
  orientation = 'vertical',
  ...props
}: ComponentProps<typeof Separator>) => (
  <Separator
    data-slot="button-group-separator"
    orientation={orientation}
    className={cn(
      'relative self-stretch bg-input data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto',
      className,
    )}
    {...props}
  />
);
