import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/styles/cn';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import { Page } from '@/widgets/Page';

const categoriesSkeletonItems = Array.from({ length: 10 }, (_, index) => index);

interface CategoriesGridProps {
  children: ReactNode;
  ariaHidden?: boolean;
}

const CategoriesGrid = ({
  children,
  ariaHidden = false,
}: CategoriesGridProps) => {
  return (
    <ul
      className={cn(
        'grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4',
        'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
      )}
      aria-hidden={ariaHidden}
    >
      {children}
    </ul>
  );
};

const CategorySkeletonItem = () => {
  return (
    <li className="min-w-0">
      <Skeleton loading className="rounded-xl bg-muted/70">
        <div className="h-44 rounded-xl border border-border/40" />
      </Skeleton>
    </li>
  );
};

export const CategoriesSkeletonGrid = ({ ariaHidden = false }) => {
  return (
    <CategoriesGrid ariaHidden={ariaHidden}>
      {categoriesSkeletonItems.map((item) => (
        <CategorySkeletonItem key={item} />
      ))}
    </CategoriesGrid>
  );
};

export const CategoriesLoadPage = () => {
  return (
    <Page heading="Categories">
      <CategoriesSkeletonGrid ariaHidden />
    </Page>
  );
};
