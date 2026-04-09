import { pagesPath } from '@/shared/routes/$path';

import {
  categoryCreateHeadingPage,
  CategoryCreateRoute,
} from '@/routes/category-management';

import {
  AdminRouteClientGuard,
  protectAdminRouteOnServer,
} from '../../_lib/admin-route-guard';

export default async function CategoryCreatePage() {
  await protectAdminRouteOnServer(pagesPath.categories.create.$url().path);

  return (
    <AdminRouteClientGuard heading={categoryCreateHeadingPage}>
      <CategoryCreateRoute />
    </AdminRouteClientGuard>
  );
}
