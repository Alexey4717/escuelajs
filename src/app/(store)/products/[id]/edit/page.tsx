import { PreloadQuery } from '@/shared/api/apollo-client/rsc';
import { ProductDetailsDocument } from '@/shared/api/generated/graphql';
import { nextCacheTags } from '@/shared/lib/cache/nextjs/tags';
import { pagesPath } from '@/shared/routes/$path';

import {
  productEditHeadingPage,
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
      <AdminRouteClientGuard heading={productEditHeadingPage}>
        <ProductEditRoute />
      </AdminRouteClientGuard>
    </PreloadQuery>
  );
}
