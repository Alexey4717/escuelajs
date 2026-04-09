'use client';

import { useParams } from 'next/navigation';

import { skipToken, useQuery } from '@apollo/client/react';

import { ProductDetailsDocument } from '@/shared/api/generated/graphql';
import { Typography } from '@/shared/ui/Typography/Typography';

import { Page } from '@/widgets/Page';

import { productEditHeadingPage } from '../lib/constants';
import { ProductEditPageParams } from '../lib/types';
import { ProductEditFormCard } from './components/ProductEditFormCard';

export function ProductEditRoute() {
  const params = useParams<ProductEditPageParams>();
  const productId = params.id;

  const { data, loading, error } = useQuery(
    ProductDetailsDocument,
    productId
      ? {
          variables: { id: productId },
        }
      : skipToken,
  );

  if (error || !productId) {
    return (
      <Page narrow heading={productEditHeadingPage}>
        <Typography variant="body1" component="p">
          Не удалось загрузить данные товара
        </Typography>
      </Page>
    );
  }

  if (loading || !data?.product) {
    return (
      <Page narrow heading={productEditHeadingPage}>
        <Typography variant="body1" component="p">
          Загрузка данных товара...
        </Typography>
      </Page>
    );
  }

  return (
    <Page narrow heading={productEditHeadingPage}>
      <ProductEditFormCard product={data.product} />
    </Page>
  );
}
