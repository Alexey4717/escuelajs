import { type ApolloClient } from '@apollo/client';

import {
  CategoriesDocument,
  CategoryDetailsDocument,
  ProductDetailsDocument,
  ProductsDocument,
  type ProductsQueryVariables,
  UserDetailsDocument,
  UsersDocument,
} from '@/shared/api/generated/graphql';
import { useAppStore } from '@/shared/lib/store';

import { useFilterProductsStore } from '@/features/filterProducts';

import { PRODUCTS_PAGE_SIZE } from '@/routes/products/constants';
import { USERS_LIST_LIMIT } from '@/routes/users/lib/constants';

import {
  makeOnboardingAdminFallbackCurrentUser,
  makeOnboardingAdminProductDetails,
  makeOnboardingCurrentUser,
  makeOnboardingProductDetails,
  ONBOARDING_ADMIN_DEMO_CATEGORIES_LIST,
  ONBOARDING_ADMIN_DEMO_CATEGORY_DETAILS,
  ONBOARDING_ADMIN_DEMO_CATEGORY_ID,
  ONBOARDING_ADMIN_DEMO_PRIMARY_USER,
  ONBOARDING_ADMIN_DEMO_PRODUCTS_LIST,
  ONBOARDING_DEMO_CATEGORY_DETAILS,
  ONBOARDING_DEMO_CATEGORY_ID,
  ONBOARDING_DEMO_FILTER_TITLE,
  ONBOARDING_DEMO_PRODUCTS_LIST,
} from './onboarding-demo-fixtures';
import {
  ensureGuestCartState,
  guestCartExpectationForStep,
} from './onboarding-guest-cart-expectations';

type CacheUserEntity = {
  __typename?: unknown;
  id?: unknown;
  name?: unknown;
  email?: unknown;
  password?: unknown;
  role?: unknown;
  avatar?: unknown;
  creationAt?: unknown;
  updatedAt?: unknown;
};

const PRODUCTS_VARS = {
  limit: PRODUCTS_PAGE_SIZE,
  offset: 0,
  price_min: null,
  price_max: null,
  title: null,
  categoryId: null,
} satisfies ProductsQueryVariables;

function seedCatalogCache(client: ApolloClient): void {
  client.writeQuery({
    query: ProductsDocument,
    variables: PRODUCTS_VARS,
    data: { products: ONBOARDING_DEMO_PRODUCTS_LIST },
  });
  client.writeQuery({
    query: ProductsDocument,
    variables: {
      ...PRODUCTS_VARS,
      title: ONBOARDING_DEMO_FILTER_TITLE,
    },
    data: { products: ONBOARDING_DEMO_PRODUCTS_LIST },
  });
  client.writeQuery({
    query: CategoryDetailsDocument,
    variables: { id: ONBOARDING_DEMO_CATEGORY_ID },
    data: { category: ONBOARDING_DEMO_CATEGORY_DETAILS },
  });
  for (const p of ONBOARDING_DEMO_PRODUCTS_LIST) {
    client.writeQuery({
      query: ProductDetailsDocument,
      variables: { id: p.id },
      data: { product: makeOnboardingProductDetails(p) },
    });
  }
}

function seedUsersCache(client: ApolloClient): void {
  const currentUserId = useAppStore.getState().currentUserId;
  const currentUserFromCache = currentUserId
    ? client.readQuery({
        query: UserDetailsDocument,
        variables: { id: currentUserId },
      })?.user
    : null;
  const fallbackCurrentUserFromCache = resolveCurrentAdminUserFromCache(
    client,
    currentUserId,
  );
  const currentUser = currentUserFromCache
    ? makeOnboardingCurrentUser(currentUserFromCache)
    : makeOnboardingAdminFallbackCurrentUser(fallbackCurrentUserFromCache);
  const users = [ONBOARDING_ADMIN_DEMO_PRIMARY_USER, currentUser].slice(
    0,
    USERS_LIST_LIMIT,
  );

  client.writeQuery({
    query: UsersDocument,
    variables: { limit: USERS_LIST_LIMIT },
    data: { users },
  });
}

function resolveCurrentAdminUserFromCache(
  client: ApolloClient,
  currentUserId: string | null,
): CacheUserEntity | null {
  const snapshot = client.cache.extract() as Record<string, unknown>;
  const rootQuery =
    snapshot.ROOT_QUERY != null && typeof snapshot.ROOT_QUERY === 'object'
      ? (snapshot.ROOT_QUERY as Record<string, unknown>)
      : null;

  if (currentUserId) {
    const directEntity = snapshot[`User:${currentUserId}`] as
      | CacheUserEntity
      | undefined;
    if (isAdminCacheUser(directEntity)) {
      return directEntity ?? null;
    }
  }

  if (rootQuery) {
    for (const key of Object.keys(rootQuery)) {
      if (!key.startsWith('user(')) {
        continue;
      }
      const value = rootQuery[key];
      if (
        value != null &&
        typeof value === 'object' &&
        '__ref' in value &&
        typeof value.__ref === 'string'
      ) {
        const entity = snapshot[value.__ref] as CacheUserEntity | undefined;
        if (isAdminCacheUser(entity)) {
          return entity ?? null;
        }
      }
    }
  }

  return null;
}

function isAdminCacheUser(user: CacheUserEntity | null | undefined): boolean {
  return (
    user?.__typename === 'User' &&
    typeof user.id === 'string' &&
    user.role === 'admin'
  );
}

function seedAdminCatalogCache(client: ApolloClient, stepIndex: number): void {
  const shouldShowCreatedCategory = stepIndex >= 4;
  const shouldShowCreatedProduct = stepIndex >= 8;

  client.writeQuery({
    query: CategoriesDocument,
    data: {
      categories: shouldShowCreatedCategory
        ? ONBOARDING_ADMIN_DEMO_CATEGORIES_LIST
        : [],
    },
  });
  client.writeQuery({
    query: CategoryDetailsDocument,
    variables: { id: ONBOARDING_ADMIN_DEMO_CATEGORY_ID },
    data: { category: ONBOARDING_ADMIN_DEMO_CATEGORY_DETAILS },
  });

  const products = shouldShowCreatedProduct
    ? ONBOARDING_ADMIN_DEMO_PRODUCTS_LIST
    : [];
  client.writeQuery({
    query: ProductsDocument,
    variables: PRODUCTS_VARS,
    data: { products },
  });
  for (const product of ONBOARDING_ADMIN_DEMO_PRODUCTS_LIST) {
    client.writeQuery({
      query: ProductDetailsDocument,
      variables: { id: product.id },
      data: { product: makeOnboardingAdminProductDetails(product) },
    });
  }
}

/** Pезолв демо-данных Apollo и корзины под шаг гостевого сценария. */
export function applyOnboardingGuestPreset(
  client: ApolloClient,
  stepIndex: number,
): void {
  seedCatalogCache(client);
  const filterStore = useFilterProductsStore.getState();
  if (stepIndex >= 1) {
    filterStore.setTitle(ONBOARDING_DEMO_FILTER_TITLE);
  } else {
    filterStore.reset();
  }
  ensureGuestCartState(guestCartExpectationForStep(stepIndex));
}

/** Минимальные данные для админ-шагов (каталог + пользователи). */
export function applyOnboardingAdminPreset(
  client: ApolloClient,
  stepIndex: number,
): void {
  seedAdminCatalogCache(client, stepIndex);
  seedUsersCache(client);
  useFilterProductsStore.getState().reset();
}

export function resetOnboardingApolloDemo(
  client: ApolloClient,
  flow: 'guest' | 'admin' | null,
): void {
  void client;
  if (flow === 'guest') {
    useFilterProductsStore.getState().reset();
  }
}

export {
  ONBOARDING_DEMO_PRODUCT_A_ID,
  ONBOARDING_DEMO_PRODUCT_B_ID,
} from './onboarding-demo-fixtures';
