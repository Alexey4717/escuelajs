import { query } from '@/shared/api/apollo-client/rsc';
import {
  HomeLandingDocument,
  type HomeLandingQuery,
} from '@/shared/api/generated/graphql';
import { nextCacheTags } from '@/shared/lib/cache/nextjs/tags';

import { HomeTestimonials } from '@/features/testimonials';

import {
  HOME_FEATURED_PRODUCTS_LIMIT,
  HOME_TESTIMONIAL_USERS_LIMIT,
} from '../constants';
import { HomeProducts } from './components/HomeProducts';

const homeLandingFetchContext = {
  fetchOptions: {
    next: {
      tags: [nextCacheTags.products, nextCacheTags.users],
    },
  },
} as const;

export async function HomeLandingSection() {
  const { data } = await query({
    query: HomeLandingDocument,
    variables: {
      productsLimit: HOME_FEATURED_PRODUCTS_LIMIT,
      productsOffset: 0,
      usersLimit: HOME_TESTIMONIAL_USERS_LIMIT,
    },
    errorPolicy: 'all',
    context: homeLandingFetchContext,
  });

  const landing: HomeLandingQuery = {
    products: data?.products ?? [],
    users: data?.users ?? [],
  };

  return (
    <>
      <HomeProducts products={landing.products} />
      <HomeTestimonials data={landing} />
    </>
  );
}
