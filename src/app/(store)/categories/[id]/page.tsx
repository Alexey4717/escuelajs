import { Suspense } from 'react';

import type { Metadata } from 'next';

import { PreloadQuery, query } from '@/shared/api/apollo-client/rsc';
import { CategoryDetailsDocument } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/config/routes/$path';
import { getAppOrigin } from '@/shared/lib/app-origin';
import { nextCacheTags } from '@/shared/lib/cache/nextjs/tags';

import {
  CategoryDetailsLoadPage,
  CategoryDetailsRoute,
} from '@/routes/category-detail';

export const dynamic = 'force-dynamic';

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
      return { title: 'Category' };
    }

    const base = getAppOrigin();
    const url = `${base}${pagesPath.categories._id(id).$url().path}`;

    return {
      title: category.name,
      description: `Category “${category.name}” in the catalog.`,
      openGraph: {
        title: category.name,
        description: `Category “${category.name}” in the catalog.`,
        url,
        type: 'website',
        ...(category.image ? { images: [{ url: category.image }] } : {}),
      },
      twitter: {
        card: 'summary_large_image',
        title: category.name,
        description: `Category “${category.name}” in the catalog.`,
        ...(category.image ? { images: [category.image] } : {}),
      },
    };
  } catch {
    return {
      title: 'Category',
    };
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
      <Suspense fallback={<CategoryDetailsLoadPage />}>
        <CategoryDetailsRoute categoryId={id} />
      </Suspense>
    </PreloadQuery>
  );
}
