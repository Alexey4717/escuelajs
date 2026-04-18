import type { Metadata } from 'next';

import { pagesPath } from '@/shared/config/routes/$path';
import { buildNoIndexMetadata } from '@/shared/lib/seo';

import {
  productCreateHeadingPage,
  ProductCreateRoute,
} from '@/routes/product-management';

import {
  AdminRouteClientGuard,
  protectAdminRouteOnServer,
} from '../../_lib/admin-route-guard';

export const metadata: Metadata = {
  ...buildNoIndexMetadata({
    title: 'Create product',
    description: 'Administrative product creation page.',
  }),
};

export default async function ProductCreatePage() {
  await protectAdminRouteOnServer(pagesPath.products.create.$url().path);

  return (
    <AdminRouteClientGuard heading={productCreateHeadingPage}>
      <ProductCreateRoute />
    </AdminRouteClientGuard>
  );
}
