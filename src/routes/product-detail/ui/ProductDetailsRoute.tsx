'use client';

import { notFound } from 'next/navigation';

import { useQuery } from '@apollo/client/react';

import { ProductDetailsDocument } from '@/shared/api/generated/graphql';

import { useOnboardingSessionStore } from '@/features/onboarding';

import { Page } from '@/widgets/Page';

import { NoProductImagesFallback } from './components/NoProductImagesFallback';
import { ProductCarousel } from './components/ProductCarousel';
import { ProductContent } from './components/ProductContent';
import { ProductDetailAdminActions } from './components/ProductDetailAdminActions/ProductDetailAdminActions';
import { ProductPageHeading } from './components/ProductPageHeading';
import { ProductDetailsLoadPage } from './ProductDetailsLoadPage';

interface ProductDetailsRouteProps {
  productId: string;
}

export const ProductDetailsRoute = ({
  productId,
}: ProductDetailsRouteProps) => {
  const isAdminOnboardingDemo = useOnboardingSessionStore(
    (s) => s.isDemoActive && s.activeFlow === 'admin',
  );
  const { data, error, loading } = useQuery(ProductDetailsDocument, {
    variables: { id: productId },
    errorPolicy: 'all',
    fetchPolicy: isAdminOnboardingDemo ? 'cache-only' : 'cache-first',
  });

  if (error) {
    throw error;
  }

  if (loading && data == null) {
    return <ProductDetailsLoadPage />;
  }

  const product = data?.product;
  // 404 только без GraphQL-ошибки; иначе — проброс в error boundary
  if (!product) {
    notFound();
  }

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
};
