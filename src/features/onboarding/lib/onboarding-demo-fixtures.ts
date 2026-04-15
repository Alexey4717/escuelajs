import type {
  ProductDetailsQuery,
  ProductsQuery,
  UsersQuery,
} from '@/shared/api/generated/graphql';

/** Демо-товары для онбординга (стабильные id). */
export const ONBOARDING_DEMO_PRODUCT_A_ID = 'onboarding-demo-product-a';
export const ONBOARDING_DEMO_PRODUCT_B_ID = 'onboarding-demo-product-b';
export const ONBOARDING_DEMO_CATEGORY_ID = 'onboarding-demo-category';
export const ONBOARDING_DEMO_FILTER_TITLE = 'Демо';
export const ONBOARDING_DEMO_CHECKOUT = {
  name: 'Демо Покупатель',
  email: 'onboarding@example.com',
  pickupAddress: 'ПВЗ: Демо-точка (55.751244, 37.618423)',
} as const;

const categoryA: ProductsQuery['products'][number]['category'] = {
  __typename: 'Category',
  id: ONBOARDING_DEMO_CATEGORY_ID,
  name: 'Демо',
  slug: 'onboarding-demo',
};

const categoryDetail: ProductDetailsQuery['product']['category'] = {
  __typename: 'Category',
  id: ONBOARDING_DEMO_CATEGORY_ID,
  name: 'Демо',
  slug: 'onboarding-demo',
  image: '',
};

export function makeOnboardingProductListItem(
  id: string,
  title: string,
  price: number,
): ProductsQuery['products'][number] {
  return {
    __typename: 'Product',
    id,
    title,
    slug: `demo-${id}`,
    price,
    images: ['/marker_pickup.svg'],
    category: categoryA,
  };
}

export const ONBOARDING_DEMO_PRODUCTS_LIST: ProductsQuery['products'] = [
  makeOnboardingProductListItem(
    ONBOARDING_DEMO_PRODUCT_A_ID,
    'Демо-товар A',
    1000,
  ),
  makeOnboardingProductListItem(
    ONBOARDING_DEMO_PRODUCT_B_ID,
    'Демо-товар B',
    2500,
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
    description: 'Описание демо-товара для обучения.',
    images: product.images,
    creationAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
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
