import { Suspense } from 'react';

import type { Metadata } from 'next';

import { PreloadQuery } from '@/shared/api/apollo-client/rsc';
import { HomeLandingDocument } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/config/routes/$path';
import { getAppOrigin } from '@/shared/lib/app-origin';
import { nextCacheTags } from '@/shared/lib/cache/nextjs/tags';

import {
  HOME_FEATURED_PRODUCTS_LIMIT,
  HOME_TESTIMONIAL_USERS_LIMIT,
  HomeLoadPage,
  HomeRoute,
} from '@/routes/home';

/** Теги `products` / `users` — для `revalidateTag` после мутаций (подборка и отзывы на главной). */
const homeLandingFetchContext = {
  fetchOptions: {
    next: {
      tags: [nextCacheTags.products, nextCacheTags.users],
    },
  },
} as const;

/** Apollo RSC + BFF используют `headers()` (cookie) — страница не статическая. */
export const dynamic = 'force-dynamic';

const description =
  'Интернет-магазин одежды и электроники: каталог, отзывы, как начать и ответы на частые вопросы.';

export async function generateMetadata(): Promise<Metadata> {
  const base = getAppOrigin();

  return {
    title: 'Главная',
    description,
    openGraph: {
      title: 'Главная',
      description,
      url: `${base}${pagesPath.$url().pathname}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Главная',
      description,
    },
  };
}

export default function HomePage() {
  return (
    <PreloadQuery
      query={HomeLandingDocument}
      variables={{
        productsLimit: HOME_FEATURED_PRODUCTS_LIMIT,
        productsOffset: 0,
        usersLimit: HOME_TESTIMONIAL_USERS_LIMIT,
      }}
      errorPolicy="all"
      context={homeLandingFetchContext}
    >
      <Suspense fallback={<HomeLoadPage />}>
        <HomeRoute />
      </Suspense>
    </PreloadQuery>
  );
}
