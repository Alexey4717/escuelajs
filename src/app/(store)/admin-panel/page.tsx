import { pagesPath } from '@/shared/config/routes/$path';

import { adminPanelHeadingPage, AdminPanelRoute } from '@/routes/admin-panel';

import {
  AdminRouteClientGuard,
  protectAdminRouteOnServer,
} from '../_lib/admin-route-guard';

export default async function AdminPanelPage() {
  await protectAdminRouteOnServer(pagesPath.admin_panel.$url().path);

  return (
    <AdminRouteClientGuard heading={adminPanelHeadingPage}>
      <AdminPanelRoute />
    </AdminRouteClientGuard>
  );
}
