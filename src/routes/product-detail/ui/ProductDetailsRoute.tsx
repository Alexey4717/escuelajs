'use client';

import { useSuspenseQuery } from '@apollo/client/react';

import { ProductDetailsDocument } from '@/shared/api/generated/graphql';

import { Page } from '@/widgets/Page';

import { NoProductImagesFallback } from './components/NoProductImagesFallback';
import { ProductCarousel } from './components/ProductCarousel';
import { ProductContent } from './components/ProductContent';
import { ProductDetailAdminActions } from './components/ProductDetailAdminActions/ProductDetailAdminActions';
import { ProductPageHeading } from './components/ProductPageHeading';

interface ProductDetailsRouteProps {
  productId: string;
}

export function ProductDetailsRoute({ productId }: ProductDetailsRouteProps) {
  const { data } = useSuspenseQuery(ProductDetailsDocument, {
    variables: { id: productId },
  });

  const product = data.product;
  const images = product.images.filter(Boolean);
  const hasMultiple = images.length > 1;

  return (
    <Page narrow heading={<ProductPageHeading />}>
      <article className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] lg:items-start lg:gap-10 xl:gap-14">
        <div className="min-w-0">
          {images.length === 0 ? (
            <NoProductImagesFallback />
          ) : (
            <ProductCarousel
              hasMultiple={hasMultiple}
              images={images}
              productTitle={product.title}
            />
          )}
        </div>

        <ProductContent
          product={product}
          titleAddon={
            <ProductDetailAdminActions
              productId={product.id}
              productTitle={product.title}
            />
          }
        />
      </article>
    </Page>
  );
}
