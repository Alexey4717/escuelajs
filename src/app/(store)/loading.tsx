import { Separator } from '@/shared/ui/Separator/Separator';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import { Page } from '@/widgets/Page';

const homeSkeletonCards = Array.from({ length: 4 }, (_, index) => index);

export default function StoreLoading() {
  return (
    <Page className="space-y-0">
      <section className="space-y-4" aria-hidden>
        <Skeleton loading className="rounded-2xl bg-muted/70">
          <div className="h-[18rem] rounded-2xl border border-border/40 sm:h-[22rem]" />
        </Skeleton>
        <Skeleton className="h-5 w-2/3" aria-hidden />
        <Skeleton className="h-4 w-full" aria-hidden />
      </section>

      <Separator className="my-14" />

      <section className="space-y-5" aria-hidden>
        <Skeleton className="h-8 w-44" aria-hidden />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {homeSkeletonCards.map((item) => (
            <Skeleton key={item} loading className="rounded-2xl bg-muted/70">
              <div className="h-64 rounded-2xl border border-border/40" />
            </Skeleton>
          ))}
        </div>
      </section>

      <Separator className="my-14" />

      <section className="space-y-5" aria-hidden>
        <Skeleton className="h-8 w-56" aria-hidden />
        <Skeleton className="h-24 w-full rounded-xl" aria-hidden />
        <Skeleton className="h-24 w-full rounded-xl" aria-hidden />
      </section>
    </Page>
  );
}
