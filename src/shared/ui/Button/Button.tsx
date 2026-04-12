import { type ComponentProps } from 'react';

import { type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { Spinner } from '@/shared/ui/Spinner/Spinner';

import { cn } from '../../lib/styles/cn';
import { buttonVariants } from './buttonVariants';

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

export const Button = ({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot.Root : 'button';
  const isDisabled = asChild ? disabled : disabled || loading;

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...props}
    >
      {!asChild && loading ? (
        <>
          {children}
          <Spinner data-icon="inline-end" />
        </>
      ) : (
        children
      )}
    </Comp>
  );
};
