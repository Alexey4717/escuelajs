'use client';

import { forwardRef } from 'react';

import type {
  ContextProp,
  GridComponents,
  GridItemProps,
  GridListProps,
} from 'react-virtuoso';

import { cn } from '@/shared/lib/styles/cn';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export type ProductsGridContext = {
  loadingMore: boolean;
};

const loadingMoreSkeletonItems = Array.from({ length: 4 }, (_, index) => index);

const ProductsGridList = forwardRef<HTMLDivElement, GridListProps>(
  function ProductsGridList({ style, children, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        {...props}
        style={style}
        className={cn(
          'grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4',
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

const ProductsGridItem = forwardRef<HTMLDivElement, GridItemProps>(
  function ProductsGridItem({ children, className, ...props }, ref) {
    return (
      <div ref={ref} {...props} className={cn('min-w-0', className)}>
        {children}
      </div>
    );
  },
);

function ProductsGridFooter({ context }: ContextProp<ProductsGridContext>) {
  if (!context?.loadingMore) {
    return null;
  }

  return (
    <div
      className="grid grid-cols-1 gap-3 py-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      aria-hidden
    >
      {loadingMoreSkeletonItems.map((item) => (
        <Skeleton key={item} className="h-3.5 rounded-md" />
      ))}
    </div>
  );
}

/** Стабильные ссылки — не объявлять inline внутри рендера (см. react-virtuoso). */
export const productsGridComponents: GridComponents<ProductsGridContext> = {
  List: ProductsGridList,
  Item: ProductsGridItem,
  Footer: ProductsGridFooter,
};
