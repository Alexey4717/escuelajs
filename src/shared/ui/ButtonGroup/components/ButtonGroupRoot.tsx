import { type VariantProps } from 'class-variance-authority';

import { cn } from '../../../lib/styles/cn';
import { buttonGroupVariants } from '../buttonGroupVariants';

export function ButtonGroupRoot({
  className,
  orientation,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}
