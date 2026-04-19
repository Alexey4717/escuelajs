import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import { Page } from '@/widgets/Page';

import { productEditHeadingPage } from '../lib/constants';

export const ProductEditLoadPage = () => (
  <Page narrow heading={productEditHeadingPage}>
    <div className="max-w-2xl rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="space-y-4" aria-hidden>
        <Skeleton className="h-6 w-52 rounded-md" />
        <Skeleton className="h-10 rounded-md" />
        <Skeleton className="h-10 rounded-md" />
        <Skeleton className="h-24 rounded-md" />
        <Skeleton className="h-32 rounded-md" />
        <div className="flex justify-end pt-2">
          <Skeleton className="h-10 w-52 rounded-md" />
        </div>
      </div>
    </div>
  </Page>
);
