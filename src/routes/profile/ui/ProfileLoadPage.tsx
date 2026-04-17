'use client';

import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

import { Page } from '@/widgets/Page';

export const ProfileLoadPage = () => (
  <Page narrow heading="Profile">
    <div
      className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,17.5rem)_1fr] lg:items-start"
      aria-hidden
    >
      <Skeleton loading className="rounded-2xl bg-muted/70">
        <div className="h-72 rounded-2xl border border-border/40" />
      </Skeleton>

      <div className="flex min-w-0 flex-col gap-6">
        <Skeleton loading className="rounded-2xl bg-muted/70">
          <div className="h-60 rounded-2xl border border-border/40" />
        </Skeleton>
        <Skeleton loading className="rounded-2xl bg-muted/70">
          <div className="h-48 rounded-2xl border border-border/40" />
        </Skeleton>
        <Skeleton className="h-20 rounded-2xl" aria-hidden />
      </div>
    </div>
  </Page>
);
