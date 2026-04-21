import { cn } from '@/shared/lib/styles/cn';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import {
  HOME_FEATURED_PRODUCTS_LIMIT,
  HOME_TESTIMONIAL_USERS_LIMIT,
} from '../constants';

const homeSkeletonProductIndices = Array.from(
  { length: HOME_FEATURED_PRODUCTS_LIMIT },
  (_, index) => index,
);

const homeSkeletonTestimonialIndices = Array.from(
  { length: HOME_TESTIMONIAL_USERS_LIMIT },
  (_, index) => index,
);

const productCoverAspectClassName =
  'aspect-[4/3] min-h-[140px] w-full sm:min-h-0 sm:aspect-[16/10] lg:aspect-[4/3]';

/** Скелетон блоков «Подборка» + отзывы — только то, что зависит от HomeLanding. */
export const HomeLandingSkeleton = () => (
  <>
    <section className="space-y-5" aria-hidden>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <Skeleton className="h-11 w-full max-w-sm rounded-md" />
        <Skeleton className="h-9 w-full rounded-lg sm:w-36 sm:shrink-0" />
      </div>
      <ul
        className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4')}
      >
        {homeSkeletonProductIndices.map((item) => (
          <li key={item} className="min-w-0">
            <div
              className={cn(
                'flex h-full flex-col gap-0 overflow-hidden rounded-xl border border-border bg-card shadow-sm',
              )}
            >
              <Skeleton
                className={cn(
                  'rounded-none rounded-t-xl',
                  productCoverAspectClassName,
                )}
              />
              <div className="rounded-t-none border-t border-border px-4 py-2">
                <Skeleton className="h-6 w-full rounded-md sm:h-7" />
              </div>
              <div className="flex items-center justify-between gap-2 rounded-b-xl border-t bg-muted/50 p-4">
                <Skeleton className="h-5 w-32 rounded-md sm:h-6" />
                <Skeleton className="h-9 min-w-[9rem] rounded-lg" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>

    <section
      className={cn(
        'relative min-w-0 space-y-8 py-10',
        '-mx-[var(--spacing-layout)] w-[calc(100%+2*var(--spacing-layout))] max-w-none',
        'border-y border-border bg-muted/30 dark:bg-muted/20',
      )}
      aria-hidden
    >
      <div className="px-[var(--spacing-layout)] text-center">
        <Skeleton className="mx-auto mb-3 h-7 w-28 rounded-full" />
        <Skeleton className="mx-auto h-10 w-full max-w-lg rounded-md" />
        <div className="mx-auto mt-2 max-w-xl space-y-2">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-[95%] rounded-md" />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-x-10 gap-y-8 px-[var(--spacing-layout)]">
        {homeSkeletonTestimonialIndices.map((item) => (
          <article
            key={item}
            className={cn(
              'flex w-full max-w-sm shrink-0 gap-4 border-l border-border pl-6 pr-2 sm:pl-8 sm:pr-4',
              'first:border-l-0 first:pl-0 sm:first:pl-0',
            )}
          >
            <Skeleton className="size-11 shrink-0 rounded-full" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-5 w-40 rounded-md" />
              <Skeleton className="h-3.5 w-48 rounded-md" />
              <div className="mt-3 space-y-2">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-[88%] rounded-md" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  </>
);
