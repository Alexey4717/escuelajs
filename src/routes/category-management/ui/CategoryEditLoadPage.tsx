import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import { Page } from '@/widgets/Page';

import { categoryEditHeadingPage } from '../lib/constants';

export const CategoryEditLoadPage = () => (
  <Page narrow heading={categoryEditHeadingPage}>
    <div className="max-w-2xl rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="space-y-4" aria-hidden>
        <Skeleton className="h-6 w-60 rounded-md" />
        <Skeleton className="h-10 rounded-md" />
        <Skeleton className="h-28 rounded-md" />
        <div className="flex justify-end pt-2">
          <Skeleton className="h-10 w-52 rounded-md" />
        </div>
      </div>
    </div>
  </Page>
);
