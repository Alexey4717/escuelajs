import { type ComponentProps } from 'react';

import { type VariantProps } from 'class-variance-authority';

import { cn } from '../../../lib/styles/cn';
import { buttonGroupVariants } from '../buttonGroupVariants';

export const ButtonGroupRoot = ({
  className,
  orientation,
  ...props
}: ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>) => (
  <div
    role="group"
    data-slot="button-group"
    data-orientation={orientation}
    className={cn(buttonGroupVariants({ orientation }), className)}
    {...props}
  />
);
