import { Suspense } from 'react';

import type { Metadata } from 'next';

import { pagesPath } from '@/shared/config/routes/$path';
import { buildPageMetadata } from '@/shared/lib/seo';

import { Page } from '@/widgets/Page';

import {
  HomeBelowFold,
  HomeHero,
  HomeLandingSection,
  HomeLandingSkeleton,
} from '@/routes/home';

/** Apollo RSC + BFF используют `headers()` (cookie) — страница не статическая. */
export const dynamic = 'force-dynamic';

const description =
  'Online store for clothing and electronics: catalog, reviews, getting started guide, and FAQ.';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: 'Home',
    description,
    path: pagesPath.$url().pathname,
  });
}

export default function HomePage() {
  return (
    <Page className="space-y-0">
      <HomeHero />
      <Suspense fallback={<HomeLandingSkeleton />}>
        <HomeLandingSection />
      </Suspense>
      <HomeBelowFold />
    </Page>
  );
}
