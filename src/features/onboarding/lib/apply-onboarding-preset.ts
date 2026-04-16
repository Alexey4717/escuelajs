import { type ApolloClient } from '@apollo/client';

import {
  CategoryDetailsDocument,
  ProductDetailsDocument,
  ProductsDocument,
  type ProductsQueryVariables,
  UsersDocument,
} from '@/shared/api/generated/graphql';

import { useFilterProductsStore } from '@/features/filterProducts';

import { PRODUCTS_PAGE_SIZE } from '@/routes/products/constants';
import { USERS_LIST_LIMIT } from '@/routes/users/lib/constants';

import {
  makeOnboardingProductDetails,
  ONBOARDING_DEMO_CATEGORY_DETAILS,
  ONBOARDING_DEMO_CATEGORY_ID,
  ONBOARDING_DEMO_FILTER_TITLE,
  ONBOARDING_DEMO_PRODUCTS_LIST,
  ONBOARDING_DEMO_USERS,
} from './onboarding-demo-fixtures';
import {
  ensureGuestCartState,
  guestCartExpectationForStep,
} from './onboarding-guest-cart-expectations';

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
  client.writeQuery({
    query: UsersDocument,
    variables: { limit: USERS_LIST_LIMIT },
    data: { users: ONBOARDING_DEMO_USERS },
  });
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
  seedCatalogCache(client);
  seedUsersCache(client);
  void stepIndex;
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
