import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import { Page } from '@/widgets/Page';

import { CategoriesSkeletonGrid } from '@/routes/categories';

export default function CategoriesLoading() {
  return (
    <Page heading={<Skeleton className="h-8 w-44" aria-hidden />}>
      <CategoriesSkeletonGrid ariaHidden />
    </Page>
  );
}
