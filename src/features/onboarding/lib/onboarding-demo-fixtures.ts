import type {
  CategoryDetailsQuery,
  ProductDetailsQuery,
  ProductsQuery,
  UsersQuery,
} from '@/shared/api/generated/graphql';

/** Демо-товары для онбординга (стабильные id). */
export const ONBOARDING_DEMO_PRODUCT_A_ID = 'onboarding-demo-product-a';
export const ONBOARDING_DEMO_PRODUCT_B_ID = 'onboarding-demo-product-b';
export const ONBOARDING_DEMO_CATEGORY_ID = 'onboarding-demo-category';

const ONBOARDING_DEMO_PRODUCT_A_IMAGES = [
  '/onboarding-demo-product-a.jpeg',
] as const;
const ONBOARDING_DEMO_PRODUCT_B_IMAGES = [
  '/onboarding-demo-product-b.jpeg',
] as const;

const ONBOARDING_DEMO_PRODUCT_DESCRIPTIONS: Record<string, string> = {
  [ONBOARDING_DEMO_PRODUCT_A_ID]:
    'Elevate your casual wardrobe with our Classic Red Pullover Hoodie. Crafted with a soft cotton blend for ultimate comfort, this vibrant red hoodie features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs for a snug fit. The timeless design ensures easy pairing with jeans or joggers for a relaxed yet stylish look, making it a versatile addition to your everyday attire.',
  [ONBOARDING_DEMO_PRODUCT_B_ID]:
    'Elevate your casual wardrobe with these classic olive chino shorts. Designed for comfort and versatility, they feature a smooth waistband, practical pockets, and a tailored fit that makes them perfect for both relaxed weekends and smart-casual occasions. The durable fabric ensures they hold up throughout your daily activities while maintaining a stylish look.',
};
export const ONBOARDING_DEMO_FILTER_TITLE = 'Демо';
export const ONBOARDING_DEMO_CHECKOUT = {
  name: 'Демо Покупатель',
  email: 'onboarding@example.com',
  pickupAddress: 'ПВЗ: Демо-точка (55.751244, 37.618423)',
} as const;

const categoryA: ProductsQuery['products'][number]['category'] = {
  __typename: 'Category',
  id: ONBOARDING_DEMO_CATEGORY_ID,
  name: 'Clothes',
  slug: 'clothes',
};

const categoryDetail: ProductDetailsQuery['product']['category'] = {
  __typename: 'Category',
  id: ONBOARDING_DEMO_CATEGORY_ID,
  name: 'Clothes',
  slug: 'clothes',
  image: '/onboarding-demo-category.jpeg',
};

/** Категория для страницы `/categories/[id]` в демо-режиме онбординга. */
export const ONBOARDING_DEMO_CATEGORY_DETAILS: CategoryDetailsQuery['category'] =
  {
    __typename: 'Category',
    id: ONBOARDING_DEMO_CATEGORY_ID,
    name: 'Clothes',
    slug: 'clothes',
    image: '/onboarding-demo-category.jpeg',
    creationAt: '2026-04-16T02:43:00.000Z',
    updatedAt: '2026-04-16T02:43:00.000Z',
  };

function makeOnboardingProductListItem(
  id: string,
  title: string,
  price: number,
  images: string[],
): ProductsQuery['products'][number] {
  return {
    __typename: 'Product',
    id,
    title,
    slug: `demo-${id}`,
    price,
    images,
    category: categoryA,
  };
}

export const ONBOARDING_DEMO_PRODUCTS_LIST: ProductsQuery['products'] = [
  makeOnboardingProductListItem(
    ONBOARDING_DEMO_PRODUCT_A_ID,
    'Classic Red Pullover Hoodie',
    10,
    [...ONBOARDING_DEMO_PRODUCT_A_IMAGES],
  ),
  makeOnboardingProductListItem(
    ONBOARDING_DEMO_PRODUCT_B_ID,
    'Classic Olive Shorts 4 men',
    84,
    [...ONBOARDING_DEMO_PRODUCT_B_IMAGES],
  ),
];

export function makeOnboardingProductDetails(
  product: ProductsQuery['products'][number],
): ProductDetailsQuery['product'] {
  return {
    __typename: 'Product',
    id: product.id,
    title: product.title,
    slug: product.slug,
    price: product.price,
    description:
      ONBOARDING_DEMO_PRODUCT_DESCRIPTIONS[product.id] ??
      'Описание демо-товара для обучения.',
    images: product.images,
    creationAt: '2026-04-16T02:43:00.000Z',
    updatedAt: '2026-04-16T02:43:00.000Z',
    category: categoryDetail,
  };
}

export const ONBOARDING_DEMO_USERS: UsersQuery['users'] = [
  {
    __typename: 'User',
    id: 'onboarding-demo-user-1',
    name: 'Демо пользователь',
    email: 'demo@example.com',
    password: '',
    role: 'customer',
    avatar: '',
    creationAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
];
