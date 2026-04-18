import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import { Page } from '@/widgets/Page';

const headingPage = 'Edit profile';

export function ProfileEditLoadPage() {
  return (
    <Page narrow heading={headingPage}>
      <div className="max-w-2xl rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="space-y-4" aria-hidden>
          <Skeleton className="h-6 w-44 rounded-md" />
          <Skeleton className="h-10 rounded-md" />
          <Skeleton className="h-10 rounded-md" />
          <Skeleton className="h-24 rounded-md" />
          <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-between">
            <Skeleton className="h-10 w-full rounded-md sm:w-40" />
            <Skeleton className="h-10 w-full rounded-md sm:w-52" />
          </div>
        </div>
      </div>
    </Page>
  );
}
