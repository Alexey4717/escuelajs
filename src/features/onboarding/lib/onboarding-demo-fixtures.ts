import type {
  CategoriesQuery,
  CategoryDetailsQuery,
  ProductDetailsQuery,
  ProductsQuery,
  UserDetailsQuery,
  UsersQuery,
} from '@/shared/api/generated/graphql';

/** Демо-товары для онбординга (стабильные id). */
export const ONBOARDING_DEMO_PRODUCT_A_ID = 'onboarding-demo-product-a';
export const ONBOARDING_DEMO_PRODUCT_B_ID = 'onboarding-demo-product-b';
export const ONBOARDING_DEMO_CATEGORY_ID = 'onboarding-demo-category';
export const ONBOARDING_ADMIN_DEMO_CATEGORY_ID = '1';
export const ONBOARDING_ADMIN_DEMO_PRODUCT_A_ID =
  'onboarding-admin-demo-product-a';
export const ONBOARDING_ADMIN_DEMO_PRODUCT_A_SLUG = 'admin-demo-product-a';

const ONBOARDING_DEMO_PRODUCT_A_IMAGES = [
  '/images/onboarding-demo-product-a.jpeg',
] as const;
const ONBOARDING_DEMO_PRODUCT_B_IMAGES = [
  '/images/onboarding-demo-product-b.jpeg',
] as const;

const ONBOARDING_DEMO_PRODUCT_DESCRIPTIONS: Record<string, string> = {
  [ONBOARDING_DEMO_PRODUCT_A_ID]:
    'Elevate your casual wardrobe with our Classic Red Pullover Hoodie. Crafted with a soft cotton blend for ultimate comfort, this vibrant red hoodie features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs for a snug fit. The timeless design ensures easy pairing with jeans or joggers for a relaxed yet stylish look, making it a versatile addition to your everyday attire.',
  [ONBOARDING_DEMO_PRODUCT_B_ID]:
    'Elevate your casual wardrobe with these classic olive chino shorts. Designed for comfort and versatility, they feature a smooth waistband, practical pockets, and a tailored fit that makes them perfect for both relaxed weekends and smart-casual occasions. The durable fabric ensures they hold up throughout your daily activities while maintaining a stylish look.',
};
export const ONBOARDING_DEMO_FILTER_TITLE = 'classic';
export const ONBOARDING_DEMO_CHECKOUT = {
  name: 'Demo Customer',
  email: 'onboarding@example.com',
  pickupAddress: 'Pickup point: Demo location (55.751244, 37.618423)',
} as const;

export const ONBOARDING_ADMIN_DEMO_CATEGORY_FORM = {
  name: 'Clothes',
  image: '/images/onboarding-demo-category.jpeg',
} as const;

export const ONBOARDING_ADMIN_DEMO_PRODUCT_FORM = {
  title: 'Classic Red Pullover Hoodie',
  price: '10',
  description:
    ONBOARDING_DEMO_PRODUCT_DESCRIPTIONS[ONBOARDING_DEMO_PRODUCT_A_ID],
  categoryId: ONBOARDING_ADMIN_DEMO_CATEGORY_ID,
  image: '/images/onboarding-demo-product-a.jpeg',
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
  image: '/images/onboarding-demo-category.jpeg',
};

const adminCategoryListItem: CategoriesQuery['categories'][number] = {
  __typename: 'Category',
  id: ONBOARDING_ADMIN_DEMO_CATEGORY_ID,
  name: ONBOARDING_ADMIN_DEMO_CATEGORY_FORM.name,
  slug: 'clothes',
  image: ONBOARDING_ADMIN_DEMO_CATEGORY_FORM.image,
};

const adminProductCategory: ProductsQuery['products'][number]['category'] = {
  __typename: 'Category',
  id: ONBOARDING_ADMIN_DEMO_CATEGORY_ID,
  name: ONBOARDING_ADMIN_DEMO_CATEGORY_FORM.name,
  slug: 'clothes',
};

/** Категория для страницы `/categories/[id]` в демо-режиме онбординга. */
export const ONBOARDING_DEMO_CATEGORY_DETAILS: CategoryDetailsQuery['category'] =
  {
    __typename: 'Category',
    id: ONBOARDING_DEMO_CATEGORY_ID,
    name: 'Clothes',
    slug: 'clothes',
    image: '/images/onboarding-demo-category.jpeg',
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

export const ONBOARDING_ADMIN_DEMO_CATEGORIES_LIST: CategoriesQuery['categories'] =
  [adminCategoryListItem];

export const ONBOARDING_ADMIN_DEMO_CATEGORY_DETAILS: CategoryDetailsQuery['category'] =
  {
    __typename: 'Category',
    id: ONBOARDING_ADMIN_DEMO_CATEGORY_ID,
    name: ONBOARDING_ADMIN_DEMO_CATEGORY_FORM.name,
    slug: 'clothes',
    image: ONBOARDING_ADMIN_DEMO_CATEGORY_FORM.image,
    creationAt: '2026-04-16T02:43:00',
    updatedAt: '2026-04-16T02:43:00',
  };

export const ONBOARDING_ADMIN_DEMO_PRODUCTS_LIST: ProductsQuery['products'] = [
  {
    __typename: 'Product',
    id: ONBOARDING_ADMIN_DEMO_PRODUCT_A_ID,
    title: ONBOARDING_ADMIN_DEMO_PRODUCT_FORM.title,
    slug: ONBOARDING_ADMIN_DEMO_PRODUCT_A_SLUG,
    price: Number(ONBOARDING_ADMIN_DEMO_PRODUCT_FORM.price),
    images: [ONBOARDING_ADMIN_DEMO_PRODUCT_FORM.image],
    category: adminProductCategory,
  },
];

export function makeOnboardingAdminProductDetails(
  product: ProductsQuery['products'][number],
): ProductDetailsQuery['product'] {
  return {
    __typename: 'Product',
    id: product.id,
    title: product.title,
    slug: product.slug,
    price: product.price,
    description: ONBOARDING_ADMIN_DEMO_PRODUCT_FORM.description,
    images: product.images,
    creationAt: '2026-04-16T02:43:00',
    updatedAt: '2026-04-16T02:43:00',
    category: {
      __typename: 'Category',
      id: ONBOARDING_ADMIN_DEMO_CATEGORY_ID,
      name: ONBOARDING_ADMIN_DEMO_CATEGORY_FORM.name,
      slug: 'clothes',
      image: ONBOARDING_ADMIN_DEMO_CATEGORY_FORM.image,
    },
  };
}

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
      'Demo product description for onboarding.',
    images: product.images,
    creationAt: '2026-04-16T02:43:00.000Z',
    updatedAt: '2026-04-16T02:43:00.000Z',
    category: categoryDetail,
  };
}

export const ONBOARDING_ADMIN_DEMO_PRIMARY_USER: UsersQuery['users'][number] = {
  __typename: 'User',
  id: 'onboarding-demo-user-jhon',
  name: 'Jhon',
  email: 'john@mail.com',
  password: '',
  role: 'customer',
  avatar: '/images/onboarding-demo-user.jpeg',
  creationAt: '2026-04-16T02:43:00',
  updatedAt: '2026-04-16T02:43:00',
};

export const ONBOARDING_ADMIN_DEMO_FALLBACK_CURRENT_USER: UsersQuery['users'][number] =
  {
    __typename: 'User',
    id: 'onboarding-demo-fallback-current-user',
    name: 'Current admin',
    email: 'current-admin@example.com',
    password: '',
    role: 'admin',
    avatar: '',
    creationAt: '2026-04-16T02:43:00',
    updatedAt: '2026-04-16T02:43:00',
  };

type OnboardingCurrentUserSource = {
  id?: unknown;
  name?: unknown;
  email?: unknown;
  password?: unknown;
  role?: unknown;
  avatar?: unknown;
  creationAt?: unknown;
  updatedAt?: unknown;
};

export function makeOnboardingAdminFallbackCurrentUser(
  source: OnboardingCurrentUserSource | null | undefined,
): UsersQuery['users'][number] {
  const normalizedSource = source ?? {};
  const id =
    typeof normalizedSource.id === 'string' ? normalizedSource.id : null;
  if (!id || normalizedSource.role !== 'admin') {
    return ONBOARDING_ADMIN_DEMO_FALLBACK_CURRENT_USER;
  }

  return {
    __typename: 'User',
    id,
    name:
      typeof normalizedSource.name === 'string'
        ? normalizedSource.name
        : ONBOARDING_ADMIN_DEMO_FALLBACK_CURRENT_USER.name,
    email:
      typeof normalizedSource.email === 'string'
        ? normalizedSource.email
        : ONBOARDING_ADMIN_DEMO_FALLBACK_CURRENT_USER.email,
    password:
      typeof normalizedSource.password === 'string'
        ? normalizedSource.password
        : '',
    role: 'admin',
    avatar:
      typeof normalizedSource.avatar === 'string'
        ? normalizedSource.avatar
        : '',
    creationAt:
      typeof normalizedSource.creationAt === 'string'
        ? normalizedSource.creationAt
        : ONBOARDING_ADMIN_DEMO_FALLBACK_CURRENT_USER.creationAt,
    updatedAt:
      typeof normalizedSource.updatedAt === 'string'
        ? normalizedSource.updatedAt
        : ONBOARDING_ADMIN_DEMO_FALLBACK_CURRENT_USER.updatedAt,
  };
}

export function makeOnboardingCurrentUser(
  currentUser: UserDetailsQuery['user'],
): UsersQuery['users'][number] {
  return {
    __typename: 'User',
    id: currentUser.id,
    name: currentUser.name,
    email: currentUser.email,
    password: currentUser.password,
    role: currentUser.role,
    avatar: currentUser.avatar,
    creationAt: currentUser.creationAt,
    updatedAt: currentUser.updatedAt,
  };
}
