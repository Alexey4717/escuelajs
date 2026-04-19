import type { Metadata } from 'next';

import { PreloadQuery, query } from '@/shared/api/apollo-client/rsc';
import { ProductDetailsDocument } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/config/routes/$path';
import { nextCacheTags } from '@/shared/lib/cache/nextjs/tags';
import { buildPageMetadata } from '@/shared/lib/seo';

import { ProductDetailsRoute } from '@/routes/product-detail';

/** Apollo RSC + BFF используют `headers()` (cookie) — страница не статическая. */
export const dynamic = 'force-dynamic';

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

function productDetailsQueryContext(id: string) {
  return {
    fetchOptions: {
      next: {
        tags: [nextCacheTags.product(id)],
      },
    },
  };
}

export async function generateMetadata({
  params,
}: ProductDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const { data } = await query({
      query: ProductDetailsDocument,
      variables: { id },
      context: productDetailsQueryContext(id),
    });

    const product = data?.product;
    if (!product) {
      return buildPageMetadata({ title: 'Product' });
    }

    const description =
      product.description.length > 160
        ? `${product.description.slice(0, 157)}…`
        : product.description;

    const ogImage = product.images[0];

    return buildPageMetadata({
      title: product.title,
      description,
      path: pagesPath.products._id(id).$url().path,
      images: ogImage ? [ogImage] : [],
    });
  } catch {
    return buildPageMetadata({ title: 'Product' });
  }
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  return (
    <PreloadQuery
      query={ProductDetailsDocument}
      variables={{ id }}
      errorPolicy="all"
      context={productDetailsQueryContext(id)}
    >
      <ProductDetailsRoute productId={id} />
    </PreloadQuery>
  );
}
