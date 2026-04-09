import { pagesPath } from '@/shared/routes/$path';

import {
  productCreateHeadingPage,
  ProductCreateRoute,
} from '@/routes/product-management';

import {
  AdminRouteClientGuard,
  protectAdminRouteOnServer,
} from '../../_lib/admin-route-guard';

export default async function ProductCreatePage() {
  await protectAdminRouteOnServer(pagesPath.products.create.$url().path);

  return (
    <AdminRouteClientGuard heading={productCreateHeadingPage}>
      <ProductCreateRoute />
    </AdminRouteClientGuard>
  );
}
