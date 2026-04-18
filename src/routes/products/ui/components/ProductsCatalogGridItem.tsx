import { memo } from 'react';

import { ProductsQuery } from '@/shared/api/generated/graphql';
import { ONBOARDING_TARGET_IDS } from '@/shared/lib/onboarding';

import { ProductCard } from '@/entities/Product';

import {
  ONBOARDING_ADMIN_DEMO_PRODUCT_A_ID,
  ONBOARDING_DEMO_PRODUCT_A_ID,
  ONBOARDING_DEMO_PRODUCT_B_ID,
} from '@/features/onboarding';
import { ToggleCartItemButton } from '@/features/toggleCartItem';

type ProductListItem = ProductsQuery['products'][number];

export const ProductsCatalogGridItem = memo(
  function ProductsCatalogGridItem({ product }: { product: ProductListItem }) {
    const isDemoA = product.id === ONBOARDING_DEMO_PRODUCT_A_ID;
    const isDemoB = product.id === ONBOARDING_DEMO_PRODUCT_B_ID;
    const isAdminDemoProductA =
      product.id === ONBOARDING_ADMIN_DEMO_PRODUCT_A_ID;
    const titleOnboardingTarget = isDemoB
      ? ONBOARDING_TARGET_IDS.catalogSecondProductLink
      : isAdminDemoProductA
        ? ONBOARDING_TARGET_IDS.productsListAdminDemoProductLink
        : undefined;

    return (
      <ProductCard
        product={product}
        titleDataOnboarding={titleOnboardingTarget}
        cartAction={
          <span
            data-onboarding={
              isDemoA
                ? ONBOARDING_TARGET_IDS.catalogFirstProductCart
                : undefined
            }
          >
            <ToggleCartItemButton
              variant="card"
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.images[0] ?? ''}
            />
          </span>
        }
      />
    );
  },
  (prev, next) =>
    prev.product.id === next.product.id &&
    prev.product.title === next.product.title &&
    prev.product.price === next.product.price &&
    prev.product.images[0] === next.product.images[0] &&
    prev.product.category.name === next.product.category.name,
);
