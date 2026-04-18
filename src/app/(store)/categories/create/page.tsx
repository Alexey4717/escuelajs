import type { Metadata } from 'next';

import { pagesPath } from '@/shared/config/routes/$path';
import { buildNoIndexMetadata } from '@/shared/lib/seo';

import {
  categoryCreateHeadingPage,
  CategoryCreateRoute,
} from '@/routes/category-management';

import {
  AdminRouteClientGuard,
  protectAdminRouteOnServer,
} from '../../_lib/admin-route-guard';

export const metadata: Metadata = {
  ...buildNoIndexMetadata({
    title: 'Create category',
    description: 'Administrative category creation page.',
  }),
};

export default async function CategoryCreatePage() {
  await protectAdminRouteOnServer(pagesPath.categories.create.$url().path);

  return (
    <AdminRouteClientGuard heading={categoryCreateHeadingPage}>
      <CategoryCreateRoute />
    </AdminRouteClientGuard>
  );
}
