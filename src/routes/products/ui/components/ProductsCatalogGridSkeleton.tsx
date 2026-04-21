import { ONBOARDING_TARGET_IDS } from '@/shared/lib/onboarding';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import {
  PRODUCTS_CATALOG_GRID_SKELETON_INDICES,
  PRODUCTS_GRID_CLASSNAME,
} from '../../lib/constants';

export const ProductsCatalogGridSkeleton = () => (
  <div
    className="space-y-6"
    data-onboarding={ONBOARDING_TARGET_IDS.productsList}
  >
    <section
      className="space-y-4 rounded-lg border border-border bg-card/40 p-4"
      aria-hidden
      data-onboarding={ONBOARDING_TARGET_IDS.catalogFilters}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Skeleton className="h-5 w-24 rounded-md" />
        <Skeleton className="h-7 w-[7.5rem] rounded-[min(var(--radius-md),12px)]" />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start lg:gap-x-6 lg:gap-y-6">
        <div className="min-w-0 space-y-2">
          <Skeleton className="h-4 w-12 rounded" />
          <Skeleton className="h-[38px] w-full rounded-md" />
        </div>
        <div className="min-w-0 space-y-2">
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-[38px] w-full rounded-md" />
        </div>
        <div className="min-w-0 space-y-2">
          <Skeleton className="h-4 w-11 rounded" />
          <Skeleton className="h-[38px] w-full rounded-md" />
          <div className="relative -mt-1 flex min-h-5 w-full justify-between px-1">
            <Skeleton className="h-3 w-7 rounded" />
            <Skeleton className="h-3 w-10 rounded" />
          </div>
        </div>
      </div>
    </section>
    <div className={PRODUCTS_GRID_CLASSNAME} aria-hidden>
      {PRODUCTS_CATALOG_GRID_SKELETON_INDICES.map((item) => (
        <Skeleton key={item} loading className="rounded-xl bg-muted/70">
          <div className="h-[22rem] rounded-xl border border-border/40" />
        </Skeleton>
      ))}
    </div>
  </div>
);
