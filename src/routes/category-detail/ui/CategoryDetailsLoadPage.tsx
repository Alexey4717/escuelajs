import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import { Page } from '@/widgets/Page';

import { CategoryPageHeading } from './components/CategoryPageHeading';

export const CategoryDetailsLoadPage = () => (
  <Page narrow heading={<CategoryPageHeading />}>
    <article
      className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:items-start lg:gap-10 xl:gap-14"
      aria-hidden
    >
      <Skeleton loading className="rounded-lg bg-muted/70">
        <div className="aspect-[4/3] w-full rounded-lg border border-border/40" />
      </Skeleton>

      <div className="flex min-w-0 flex-col gap-5">
        <Skeleton className="h-10 w-4/5 rounded-md" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-9 w-36 rounded-md" />
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>
        <Skeleton loading className="rounded-lg bg-muted/70">
          <div className="h-28 rounded-lg border border-border/40" />
        </Skeleton>
      </div>
    </article>
  </Page>
);
