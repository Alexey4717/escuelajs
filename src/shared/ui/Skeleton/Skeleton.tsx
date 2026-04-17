import type { ComponentProps, ReactNode } from 'react';

import { cn } from '../../lib/styles/cn';

interface SkeletonProps extends Omit<ComponentProps<'div'>, 'children'> {
  loading?: boolean;
  children?: ReactNode;
  containerClassName?: string;
}

export const Skeleton = ({
  className,
  loading = true,
  children,
  containerClassName,
  ...props
}: SkeletonProps) => {
  if (children !== undefined) {
    return (
      <div
        data-slot="skeleton-container"
        className={cn('relative', containerClassName)}
        aria-busy={loading || undefined}
      >
        <div
          className={cn(loading && 'invisible')}
          aria-hidden={loading || undefined}
        >
          {children}
        </div>
        {loading ? (
          <div
            data-slot="skeleton"
            className={cn(
              'absolute inset-0 animate-pulse rounded-[inherit] bg-muted',
              className,
            )}
            {...props}
          />
        ) : null}
      </div>
    );
  }

  return (
    <div
      data-slot="skeleton"
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
};
