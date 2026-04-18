import type { Metadata } from 'next';

import { PreloadQuery } from '@/shared/api/apollo-client/rsc';
import { ProductDetailsDocument } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/config/routes/$path';
import { nextCacheTags } from '@/shared/lib/cache/nextjs/tags';
import { buildNoIndexMetadata } from '@/shared/lib/seo';

import {
  productEditHeadingPage,
  ProductEditLoadPage,
  ProductEditPageParams,
  ProductEditRoute,
} from '@/routes/product-management';

import {
  AdminRouteClientGuard,
  protectAdminRouteOnServer,
} from '../../../_lib/admin-route-guard';

interface ProductEditPageProps {
  params: Promise<ProductEditPageParams>;
}

export const metadata: Metadata = {
  ...buildNoIndexMetadata({
    title: 'Edit product',
    description: 'Administrative product editing page.',
  }),
};

export default async function ProductEditPage({
  params,
}: ProductEditPageProps) {
  const { id } = await params;

  // Важно: сначала проверяем доступ; при redirect PreloadQuery ниже не выполнится.
  await protectAdminRouteOnServer(pagesPath.products._id(id).edit.$url().path);

  return (
    <PreloadQuery
      query={ProductDetailsDocument}
      variables={{ id }}
      errorPolicy="all"
      context={{
        fetchOptions: {
          next: {
            tags: [nextCacheTags.product(id)],
          },
        },
      }}
    >
      <AdminRouteClientGuard
        heading={productEditHeadingPage}
        fallback={<ProductEditLoadPage />}
      >
        <ProductEditRoute />
      </AdminRouteClientGuard>
    </PreloadQuery>
  );
}
