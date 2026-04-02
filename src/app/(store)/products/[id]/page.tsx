import { Suspense } from 'react';

import type { Metadata } from 'next';

import { PreloadQuery, query } from '@/shared/api/apollo-client/rsc';
import { getAppOrigin } from '@/shared/lib/app-origin';

import {
  ProductDetailsDocument,
  ProductDetailsView,
} from '@/routes/product-detail';

/** Apollo RSC + BFF используют `headers()` (cookie) — страница не статическая. */
export const dynamic = 'force-dynamic';

type ProductDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ProductDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const { data } = await query({
      query: ProductDetailsDocument,
      variables: { id },
    });

    const product = data?.product;
    if (!product) {
      return { title: 'Товар' };
    }

    const description =
      product.description.length > 160
        ? `${product.description.slice(0, 157)}…`
        : product.description;

    const base = getAppOrigin();
    const url = `${base}/products/${id}`;
    const ogImage = product.images[0];

    return {
      title: product.title,
      description,
      openGraph: {
        title: product.title,
        description,
        url,
        type: 'website',
        ...(ogImage ? { images: [{ url: ogImage }] } : {}),
      },
      twitter: {
        card: 'summary_large_image',
        title: product.title,
        description,
        ...(ogImage ? { images: [ogImage] } : {}),
      },
    };
  } catch {
    return {
      title: 'Товар',
    };
  }
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  return (
    <PreloadQuery query={ProductDetailsDocument} variables={{ id }}>
      <Suspense
        fallback={<p className="text-muted-foreground">Загрузка товара…</p>}
      >
        <ProductDetailsView productId={id} />
      </Suspense>
    </PreloadQuery>
  );
}
