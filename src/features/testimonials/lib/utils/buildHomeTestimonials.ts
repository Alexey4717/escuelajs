import type { HomeLandingQuery } from '@/shared/api/generated/graphql';

import { HomeTestimonial } from '../types';

type UserRow = HomeLandingQuery['users'][number];
type ProductRow = HomeLandingQuery['products'][number];
const REVIEW_BLUEPRINTS: Array<{
  quote: string;
  subtitle: string;
}> = [
  {
    quote:
      'Checkout was smooth, and product pages spell out the details — variants and specs are easy to compare.',
    subtitle: 'Catalog shopper',
  },
  {
    quote:
      'Easy to compare prices across categories. I use another cart for real purchases, but browsing the assortment here is a pleasure.',
    subtitle: 'Browser, multi-category',
  },
  {
    quote:
      'Calm interface without noise. I found what I needed with a couple of clicks using the category filter.',
    subtitle: 'Returning visitor',
  },
  {
    quote:
      'Registration took a minute. The profile is handy — I can see orders and change my password without fuss.',
    subtitle: 'Registered user',
  },
  {
    quote:
      'I pick gifts for the team here — great photos across unrelated categories. Makes shortlisting simple.',
    subtitle: 'Team buyer',
  },
  {
    quote:
      'As an admin I like that roles are split: catalog for everyone, management only with permissions.',
    subtitle: 'Store administrator',
  },
  {
    quote:
      'One storefront for the whole family’s wishlist. Less jumping between shops.',
    subtitle: 'Household shopper',
  },
  {
    quote:
      'Product pages with image carousels are great — you know what you’re getting before you add to cart.',
    subtitle: 'Returning customer',
  },
];

const withProductHint = (
  quote: string,
  product: ProductRow | undefined,
): string => {
  if (!product?.title) {
    return quote;
  }
  return `${quote} A standout for me was “${product.title}”.`;
};

const fallbackTestimonials = (): HomeTestimonial[] =>
  REVIEW_BLUEPRINTS.slice(0, 6).map((b, i) => ({
    id: `demo-${i}`,
    name:
      ['Anna K.', 'Michael S.', 'Elena V.', 'Dmitry P.', 'Olga M.', 'Igor T.'][
        i
      ] ?? `Guest ${i + 1}`,
    subtitle: b.subtitle,
    quote: b.quote,
    avatarUrl: null,
  }));

export const buildHomeTestimonials = (
  users: UserRow[],
  products: ProductRow[],
): HomeTestimonial[] => {
  if (!users.length) {
    return fallbackTestimonials();
  }

  return users.map((user, i) => {
    const blueprint = REVIEW_BLUEPRINTS[i % REVIEW_BLUEPRINTS.length]!;
    const product =
      products.length > 0 ? products[i % products.length] : undefined;
    const roleLower = user.role?.toLowerCase() ?? '';
    const roleLabel =
      roleLower === 'admin' || roleLower === 'administrator'
        ? 'Administrator'
        : 'Customer';
    return {
      id: user.id,
      name: user.name,
      subtitle: `${roleLabel} · Escuela.io`,
      quote: withProductHint(blueprint.quote, product),
      avatarUrl: user.avatar?.trim() ? user.avatar : null,
    };
  });
};
