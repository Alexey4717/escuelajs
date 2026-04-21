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
    <div className="flex flex-wrap gap-2.5" aria-hidden>
      <Skeleton className="h-10 w-44 rounded-md" />
      <Skeleton className="h-10 w-36 rounded-md" />
      <Skeleton className="h-10 w-28 rounded-md" />
      <Skeleton className="h-10 w-40 rounded-md" />
    </div>
    <div className={PRODUCTS_GRID_CLASSNAME} aria-hidden>
      {PRODUCTS_CATALOG_GRID_SKELETON_INDICES.map((item) => (
        <Skeleton key={item} loading className="rounded-xl bg-muted/70">
          <div className="h-[22rem] rounded-xl border border-border/40" />
        </Skeleton>
      ))}
    </div>
  </div>
);
