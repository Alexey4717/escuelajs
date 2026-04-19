import type { Metadata } from 'next';
import Link from 'next/link';

import { ArrowUpRight, Lock, UserRound } from 'lucide-react';

import { pagesPath } from '@/shared/config/routes/$path';
import { buildNoIndexMetadata } from '@/shared/lib/seo';

import { Page } from '@/widgets/Page';

export const metadata: Metadata = {
  ...buildNoIndexMetadata({
    title: 'Access denied',
    description: 'Access restriction page based on user role.',
  }),
};

export default function ForbiddenPage() {
  return (
    <Page
      narrow
      className="flex min-h-[min(100dvh,100vh)] w-full items-center justify-center space-y-0 bg-background px-6 py-20"
    >
      <section className="flex w-full max-w-2xl flex-col items-center text-center">
        <div className="mb-16">
          <Link
            href={pagesPath.$url().path}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card/80 px-2 py-1.5 text-card-foreground transition-colors hover:bg-muted"
          >
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-[12px] font-bold text-primary-foreground">
              E
            </span>
            <span className="text-[15px] font-semibold leading-tight">
              Escuela<span className="text-primary">.</span>io
            </span>
          </Link>
        </div>
        <div className="relative mb-7 flex size-28 items-center justify-center rounded-[1.75rem] border border-border/70 bg-card/60 text-muted-foreground shadow-sm backdrop-blur-sm sm:size-32">
          <Lock className="size-14 sm:size-16" strokeWidth={1.5} />
          <div className="absolute -bottom-1 -right-1 flex size-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground sm:size-11">
            <UserRound className="size-5 sm:size-6" strokeWidth={1.75} />
          </div>
        </div>

        <h1 className="max-w-xl text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          You do not have enough permissions to view this page
        </h1>
        <p className="mt-4 max-w-xl text-pretty text-sm leading-6 text-muted-foreground sm:text-base">
          Access to this section is restricted for your current account role.
        </p>

        <Link
          href={pagesPath.profile.edit.$url().path}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline"
        >
          go to profile settings and change your role
          <ArrowUpRight className="size-4" strokeWidth={1.75} />
        </Link>
      </section>
    </Page>
  );
}
