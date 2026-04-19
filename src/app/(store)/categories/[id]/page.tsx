import type { Metadata } from 'next';

import { PreloadQuery, query } from '@/shared/api/apollo-client/rsc';
import { CategoryDetailsDocument } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/config/routes/$path';
import { nextCacheTags } from '@/shared/lib/cache/nextjs/tags';
import { buildPageMetadata } from '@/shared/lib/seo';

import { CategoryDetailsRoute } from '@/routes/category-detail';

export const revalidate = 3600;

interface CategoryDetailsPageProps {
  params: Promise<{ id: string }>;
}

function categoryDetailsQueryContext(id: string) {
  return {
    fetchOptions: {
      next: {
        tags: [nextCacheTags.category(id)],
      },
    },
  };
}

export async function generateMetadata({
  params,
}: CategoryDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const { data } = await query({
      query: CategoryDetailsDocument,
      variables: { id },
      context: categoryDetailsQueryContext(id),
    });

    const category = data?.category;
    if (!category) {
      return buildPageMetadata({ title: 'Category' });
    }

    const description = `Category “${category.name}” in the catalog.`;

    return buildPageMetadata({
      title: category.name,
      description,
      path: pagesPath.categories._id(id).$url().path,
      images: category.image ? [category.image] : [],
    });
  } catch {
    return buildPageMetadata({ title: 'Category' });
  }
}

export default async function CategoryDetailsPage({
  params,
}: CategoryDetailsPageProps) {
  const { id } = await params;

  return (
    <PreloadQuery
      query={CategoryDetailsDocument}
      variables={{ id }}
      errorPolicy="all"
      context={categoryDetailsQueryContext(id)}
    >
      <CategoryDetailsRoute categoryId={id} />
    </PreloadQuery>
  );
}
