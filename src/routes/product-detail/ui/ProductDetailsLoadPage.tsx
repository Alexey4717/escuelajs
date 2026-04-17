'use client';

import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import { Page } from '@/widgets/Page';

import { ProductPageHeading } from './components/ProductPageHeading';

export const ProductDetailsLoadPage = () => {
  return (
    <Page narrow heading={<ProductPageHeading />}>
      <article
        className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:items-start lg:gap-10 xl:gap-14"
        aria-hidden
      >
        <div className="min-w-0">
          <Skeleton loading className="rounded-2xl bg-muted/70">
            <div className="aspect-square w-full rounded-2xl border border-border/40" />
          </Skeleton>
        </div>

        <div className="space-y-6">
          <Skeleton loading className="rounded-lg bg-muted/70">
            <div className="h-11 rounded-lg border border-border/40" />
          </Skeleton>
          <Skeleton className="h-5 w-1/3" aria-hidden />
          <Skeleton className="h-4 w-full" aria-hidden />
          <Skeleton className="h-4 w-11/12" aria-hidden />
          <Skeleton className="h-4 w-10/12" aria-hidden />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Skeleton className="h-10 rounded-md" aria-hidden />
            <Skeleton className="h-10 rounded-md" aria-hidden />
          </div>
        </div>
      </article>
    </Page>
  );
};
