import type { HomeLandingQuery } from '@/shared/api/generated/graphql';

import { HomeTestimonial } from '../types';

type UserRow = HomeLandingQuery['users'][number];
type ProductRow = HomeLandingQuery['products'][number];

const REVIEW_BLUEPRINTS: Array<{ quote: string; subtitle: string }> = [
  {
    quote:
      'I ordered a jacket and headphones — fast delivery, and the catalog makes sizes and specs easy to understand.',
    subtitle: 'Shopper, Clothing',
  },
  {
    quote:
      'Easy to compare prices across categories. My cart lives elsewhere, but here it’s great for browsing the assortment.',
    subtitle: 'Shopper, electronics',
  },
  {
    quote:
      'Calm interface without noise. I found what I needed with a couple of clicks using the category filter.',
    subtitle: 'Escuela.io customer',
  },
  {
    quote:
      'Registration took a minute. The profile is handy — I can see orders and change my password without fuss.',
    subtitle: 'Registered user',
  },
  {
    quote:
      'I buy gifts for colleagues here: T-shirts and gadgets. Product photos are top-notch.',
    subtitle: 'HR, corporate purchasing',
  },
  {
    quote:
      'As an admin I like that roles are split: catalog for everyone, management only with permissions.',
    subtitle: 'Store administrator',
  },
  {
    quote:
      'We order clothes and tech for the family in one place. Saves time on searching.',
    subtitle: 'Family shopper',
  },
  {
    quote:
      'Product pages with photo carousels are great. You know exactly what you’re getting.',
    subtitle: 'Returning customer',
  },
];

function withProductHint(
  quote: string,
  product: ProductRow | undefined,
): string {
  if (!product?.title) {
    return quote;
  }
  return `${quote} A standout for me was “${product.title}”.`;
}

function fallbackTestimonials(): HomeTestimonial[] {
  return REVIEW_BLUEPRINTS.slice(0, 6).map((b, i) => ({
    id: `demo-${i}`,
    name:
      ['Anna K.', 'Michael S.', 'Elena V.', 'Dmitry P.', 'Olga M.', 'Igor T.'][
        i
      ] ?? `Guest ${i + 1}`,
    subtitle: b.subtitle,
    quote: b.quote,
    avatarUrl: null,
  }));
}

export function buildHomeTestimonials(
  users: UserRow[],
  products: ProductRow[],
): HomeTestimonial[] {
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
}
