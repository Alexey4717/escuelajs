import { Suspense } from 'react';

import type { Metadata } from 'next';

import { PreloadQuery, query } from '@/shared/api/apollo-client/rsc';
import { CategoryDetailsDocument } from '@/shared/api/generated/graphql';
import { getAppOrigin } from '@/shared/lib/app-origin';
import { nextCacheTags } from '@/shared/lib/cache/nextjs/tags';
import { pagesPath } from '@/shared/routes/$path';
import { Typography } from '@/shared/ui/Typography/Typography';

import { CategoryDetailsRoute } from '@/routes/category-detail';

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
      return { title: 'Категория' };
    }

    const base = getAppOrigin();
    const url = `${base}${pagesPath.categories._id(id).$url().path}`;

    return {
      title: category.name,
      description: `Категория «${category.name}» в каталоге.`,
      openGraph: {
        title: category.name,
        description: `Категория «${category.name}» в каталоге.`,
        url,
        type: 'website',
        ...(category.image ? { images: [{ url: category.image }] } : {}),
      },
      twitter: {
        card: 'summary_large_image',
        title: category.name,
        description: `Категория «${category.name}» в каталоге.`,
        ...(category.image ? { images: [category.image] } : {}),
      },
    };
  } catch {
    return {
      title: 'Категория',
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
      <Suspense
        fallback={<Typography variant="muted">Загрузка категории…</Typography>}
      >
        <CategoryDetailsRoute categoryId={id} />
      </Suspense>
    </PreloadQuery>
  );
}
