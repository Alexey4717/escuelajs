'use client';

import { useSuspenseQuery } from '@apollo/client/react';

import { CategoriesDocument } from '@/shared/api/generated/graphql';
import { cn } from '@/shared/lib/styles/cn';
import { Typography } from '@/shared/ui/Typography/Typography';

import { useCurrentUserRole } from '@/entities/Session';

import { Page } from '@/widgets/Page';

import { CategoryCard } from './components/CategoryCard';

export const CategoriesRoute = () => {
  const { data } = useSuspenseQuery(CategoriesDocument);
  const { role, loading: roleLoading } = useCurrentUserRole();
  const canManageCategories = !roleLoading && role === 'admin';

  return (
    <Page className="space-y-6" heading="Категории">
      {data.categories.length ? (
        <ul
          className={cn(
            'grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4',
            'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
          )}
        >
          {data.categories.map((category) => (
            <li key={category.id} className="min-w-0">
              <CategoryCard
                category={category}
                canManageCategories={canManageCategories}
              />
            </li>
          ))}
        </ul>
      ) : (
        <Typography variant="muted">Категории пока недоступны.</Typography>
      )}
    </Page>
  );
};
