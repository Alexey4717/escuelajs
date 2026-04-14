import { Suspense } from 'react';

import type { Metadata } from 'next';

import { PreloadQuery } from '@/shared/api/apollo-client/rsc';
import { CategoriesDocument } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/config/routes/$path';
import { getAppOrigin } from '@/shared/lib/app-origin';
import { nextCacheTags } from '@/shared/lib/cache/nextjs/tags';
import { Typography } from '@/shared/ui/Typography/Typography';

import { CategoriesRoute } from '@/routes/categories';

const CATEGORIES_REVALIDATE_SEC = 86_400; // 24 ч — категории меняются редко

const description =
  'Категории товаров в каталоге: одежда, электроника, мебель, обувь и другие разделы.';

export async function generateMetadata(): Promise<Metadata> {
  const base = getAppOrigin();

  return {
    title: 'Категории',
    description,
    openGraph: {
      title: 'Категории',
      description,
      url: `${base}${pagesPath.categories.$url().pathname}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Категории',
      description,
    },
  };
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
      <Suspense
        fallback={<Typography variant="muted">Загрузка категорий…</Typography>}
      >
        <CategoriesRoute />
      </Suspense>
    </PreloadQuery>
  );
}
