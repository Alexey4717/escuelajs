import type { Metadata } from 'next';

import { PreloadQuery } from '@/shared/api/apollo-client/rsc';
import { CategoriesDocument } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/config/routes/$path';
import { nextCacheTags } from '@/shared/lib/cache/nextjs/tags';
import { buildPageMetadata } from '@/shared/lib/seo';

import { CategoriesRoute } from '@/routes/categories';

const CATEGORIES_REVALIDATE_SEC = 86_400; // 24 ч — категории меняются редко

const description =
  'Browse product categories in the shared catalog — from everyday essentials to specialty picks.';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    title: 'Categories',
    description,
    path: pagesPath.categories.$url().pathname,
  });
}

/** Кеш Next.js Data Cache для GraphQL fetch: категории на API меняются редко (см. `http-link` + cookie на SSR). */
const categoriesFetchContext = {
  fetchOptions: {
    next: {
      revalidate: CATEGORIES_REVALIDATE_SEC,
      tags: [nextCacheTags.categories],
    },
  },
} as const;

export default function CategoriesPage() {
  return (
    <PreloadQuery
      query={CategoriesDocument}
      errorPolicy="all"
      context={categoriesFetchContext}
    >
      <CategoriesRoute />
    </PreloadQuery>
  );
}
