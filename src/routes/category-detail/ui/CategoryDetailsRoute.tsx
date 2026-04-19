'use client';

import { notFound } from 'next/navigation';

import { useSuspenseQuery } from '@apollo/client/react';

import { CategoryDetailsDocument } from '@/shared/api/generated/graphql';
import { formatDateTime } from '@/shared/lib/data-processing/date/format-date-time';
import { cn } from '@/shared/lib/styles/cn';
import { AppImage } from '@/shared/ui/AppImage/AppImage';
import { Typography } from '@/shared/ui/Typography/Typography';

import { Page } from '@/widgets/Page';

import { CategoryDetailAdminActions } from './components/CategoryDetailAdminActions/CategoryDetailAdminActions';
import { CategoryPageHeading } from './components/CategoryPageHeading';

interface CategoryDetailsRouteProps {
  categoryId: string;
}

export const CategoryDetailsRoute = ({
  categoryId,
}: CategoryDetailsRouteProps) => {
  const { data, error } = useSuspenseQuery(CategoryDetailsDocument, {
    variables: { id: categoryId },
    errorPolicy: 'all',
  });

  if (error) {
    throw error;
  }

  const category = data?.category;
  // 404 только без GraphQL-ошибки; иначе — проброс в error boundary
  if (!category) {
    notFound();
  }

  const createdLabel = formatDateTime(category.creationAt);
  const updatedLabel = formatDateTime(category.updatedAt);

  return (
    <Page narrow heading={<CategoryPageHeading />}>
      <article className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:items-start lg:gap-10 xl:gap-14">
        <div className="relative aspect-[4/3] w-full min-w-0 overflow-hidden rounded-lg border border-border bg-muted shadow-sm">
          {category.image ? (
            <AppImage
              src={category.image}
              alt=""
              className="absolute inset-0 size-full object-cover"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center text-muted-foreground"
              aria-hidden
            >
              —
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          <Typography
            variant="h2"
            component="h1"
            align="left"
            className="border-0 pb-0 text-3xl font-bold tracking-tight text-balance text-foreground md:text-4xl"
          >
            {category.name}
          </Typography>

          <div className="flex flex-wrap gap-2">
            <CategoryDetailAdminActions
              categoryId={String(category.id)}
              categoryName={category.name}
            />
          </div>

          <dl
            className={cn(
              'grid gap-3 rounded-lg border border-border/60 bg-card/40 p-4 text-sm shadow-sm',
              'sm:grid-cols-2',
            )}
          >
            <div className="flex flex-col gap-0.5">
              <dt className="text-muted-foreground">Created</dt>
              <dd className="font-medium text-foreground">{createdLabel}</dd>
            </div>
            <div className="flex flex-col gap-0.5">
              <dt className="text-muted-foreground">Updated</dt>
              <dd className="font-medium text-foreground">{updatedLabel}</dd>
            </div>
          </dl>
        </div>
      </article>
    </Page>
  );
};
