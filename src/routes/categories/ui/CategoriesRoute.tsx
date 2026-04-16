'use client';

import { useQuery } from '@apollo/client/react';

import { CategoriesDocument } from '@/shared/api/generated/graphql';
import { ONBOARDING_TARGET_IDS } from '@/shared/lib/onboarding';
import { cn } from '@/shared/lib/styles/cn';
import { Typography } from '@/shared/ui/Typography/Typography';

import {
  ONBOARDING_ADMIN_DEMO_CATEGORIES_LIST,
  useOnboardingSessionStore,
} from '@/features/onboarding';

import { Page } from '@/widgets/Page';

import { CategoryCard } from './components/CategoryCard';

export const CategoriesRoute = () => {
  const isAdminOnboardingDemo = useOnboardingSessionStore(
    (s) => s.isDemoActive && s.activeFlow === 'admin',
  );
  const currentStepIndex = useOnboardingSessionStore((s) => s.currentStepIndex);
  const shouldShowSingleDemoCategory =
    isAdminOnboardingDemo && currentStepIndex >= 5;
  const { data, loading } = useQuery(CategoriesDocument, {
    skip: shouldShowSingleDemoCategory,
    fetchPolicy: isAdminOnboardingDemo ? 'cache-only' : 'cache-first',
  });
  const categories = shouldShowSingleDemoCategory
    ? ONBOARDING_ADMIN_DEMO_CATEGORIES_LIST
    : (data?.categories ?? []);
  const isInitialLoading =
    !shouldShowSingleDemoCategory && loading && data == null;

  return (
    <Page className="space-y-6" heading="Категории">
      <div data-onboarding={ONBOARDING_TARGET_IDS.categoriesList}>
        {isInitialLoading ? (
          <Typography variant="muted">Загрузка категорий…</Typography>
        ) : categories.length ? (
          <ul
            className={cn(
              'grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4',
              'md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
            )}
          >
            {categories.map((category) => (
              <li key={category.id} className="min-w-0">
                <CategoryCard category={category} />
              </li>
            ))}
          </ul>
        ) : (
          <Typography variant="muted">Категории пока недоступны.</Typography>
        )}
      </div>
    </Page>
  );
};
