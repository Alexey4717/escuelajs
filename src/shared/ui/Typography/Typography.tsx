import { forwardRef } from 'react';

import { Slot } from 'radix-ui';

import { cn } from '@/shared/lib/styles/cn';

import { defaultComponentByVariant } from './constants';
import { TypographyProps } from './types';
import { typographyVariants } from './typographyVariants';

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant = 'body1',
      align = 'inherit',
      gutterBottom = false,
      noWrap = false,
      component,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild
      ? Slot.Root
      : (component ?? defaultComponentByVariant[variant]);

    return (
      <Comp
        ref={ref}
        data-slot="typography"
        data-variant={variant}
        className={cn(
          typographyVariants({
            variant,
            align,
            gutterBottom,
            noWrap,
            className,
          }),
        )}
        {...props}
      />
    );
  },
);

Typography.displayName = 'Typography';
