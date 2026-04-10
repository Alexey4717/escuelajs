import { PreloadQuery } from '@/shared/api/apollo-client/rsc';
import { CategoryDetailsDocument } from '@/shared/api/generated/graphql';
import { nextCacheTags } from '@/shared/lib/next-cache-tags/tags';
import { pagesPath } from '@/shared/routes/$path';

import {
  categoryEditHeadingPage,
  CategoryEditPageParams,
  CategoryEditRoute,
} from '@/routes/category-management';

import {
  AdminRouteClientGuard,
  protectAdminRouteOnServer,
} from '../../../_lib/admin-route-guard';

interface CategoryEditPageProps {
  params: Promise<CategoryEditPageParams>;
}

export default async function CategoryEditPage({
  params,
}: CategoryEditPageProps) {
  const { id } = await params;

  // Важно: сначала проверяем доступ; при redirect PreloadQuery ниже не выполнится.
  await protectAdminRouteOnServer(
    pagesPath.categories._id(id).edit.$url().path,
  );

  return (
    <PreloadQuery
      query={CategoryDetailsDocument}
      variables={{ id }}
      errorPolicy="all"
      context={{
        fetchOptions: {
          next: {
            tags: [nextCacheTags.category(id)],
          },
        },
      }}
    >
      <AdminRouteClientGuard heading={categoryEditHeadingPage}>
        <CategoryEditRoute />
      </AdminRouteClientGuard>
    </PreloadQuery>
  );
}
