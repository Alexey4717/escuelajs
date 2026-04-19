import type { Metadata } from 'next';

import { PreloadQuery } from '@/shared/api/apollo-client/rsc';
import { HomeLandingDocument } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/config/routes/$path';
import { nextCacheTags } from '@/shared/lib/cache/nextjs/tags';
import { buildPageMetadata } from '@/shared/lib/seo';

import {
  HOME_FEATURED_PRODUCTS_LIMIT,
  HOME_TESTIMONIAL_USERS_LIMIT,
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
      <HomeRoute />
    </PreloadQuery>
  );
}
