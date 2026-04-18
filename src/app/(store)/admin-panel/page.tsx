import type { Metadata } from 'next';

import { pagesPath } from '@/shared/config/routes/$path';
import { buildNoIndexMetadata } from '@/shared/lib/seo';

import { adminPanelHeadingPage, AdminPanelRoute } from '@/routes/admin-panel';

import {
  AdminRouteClientGuard,
  protectAdminRouteOnServer,
} from '../_lib/admin-route-guard';

export const metadata: Metadata = {
  ...buildNoIndexMetadata({
    title: 'Admin Panel',
    description: 'Administrative area of the storefront.',
  }),
};

export default async function AdminPanelPage() {
  await protectAdminRouteOnServer(pagesPath.admin_panel.$url().path);

  return (
    <AdminRouteClientGuard heading={adminPanelHeadingPage}>
      <AdminPanelRoute />
    </AdminRouteClientGuard>
  );
}
