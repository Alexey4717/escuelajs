import type { Metadata } from 'next';

import { PreloadQuery } from '@/shared/api/apollo-client/rsc';
import { CategoryDetailsDocument } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/config/routes/$path';
import { nextCacheTags } from '@/shared/lib/cache/nextjs/tags';
import { buildNoIndexMetadata } from '@/shared/lib/seo';

import {
  categoryEditHeadingPage,
  CategoryEditLoadPage,
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

export const metadata: Metadata = {
  ...buildNoIndexMetadata({
    title: 'Edit category',
    description: 'Administrative category editing page.',
  }),
};

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
      <AdminRouteClientGuard
        heading={categoryEditHeadingPage}
        fallback={<CategoryEditLoadPage />}
      >
        <CategoryEditRoute />
      </AdminRouteClientGuard>
    </PreloadQuery>
  );
}
