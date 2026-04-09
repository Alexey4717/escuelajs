'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { revalidateTagsAction } from '@/shared/api/cache/revalidate-tags.action';
import { UpdateProductDocument } from '@/shared/api/generated/graphql';
import { nextCacheTags } from '@/shared/lib/next-cache-tags/tags';
import { pagesPath } from '@/shared/routes/$path';

import type { ProductFormStateOutput } from './schema';

interface UpdateSubmitArgs {
  productId: string;
  values: ProductFormStateOutput;
}

export function useUpdateSubmitHandler() {
  const router = useRouter();
  const [updateProduct, { loading }] = useMutation(UpdateProductDocument);

  async function handleSubmit({ productId, values }: UpdateSubmitArgs) {
    try {
      const { data } = await updateProduct({
        variables: {
          id: productId,
          changes: {
            title: values.title,
            price: Number(values.price),
            description: values.description,
            categoryId: Number(values.categoryId),
            images: [values.image],
          },
        },
        update(cache, { data: mutationData }) {
          const updatedProduct = mutationData?.updateProduct;
          if (!updatedProduct) return;

          const productCacheId = cache.identify({
            __typename: 'Product',
            id: updatedProduct.id,
          });

          if (productCacheId) {
            cache.modify({
              id: productCacheId,
              fields: {
                title: () => updatedProduct.title,
                price: () => updatedProduct.price,
                description: () => updatedProduct.description,
                images: () => updatedProduct.images,
                category: () => updatedProduct.category,
              },
            });
          } else {
            cache.evict({
              id: 'ROOT_QUERY',
              fieldName: 'product',
              args: { id: productId },
            });
          }

          cache.evict({ id: 'ROOT_QUERY', fieldName: 'products' });
          cache.gc();
        },
      });

      if (!data?.updateProduct) {
        throw new Error('Не удалось обновить товар');
      }

      await revalidateTagsAction({
        tags: [nextCacheTags.products, nextCacheTags.product(productId)],
        paths: [
          pagesPath.products.$url().path,
          pagesPath.products._id(productId).edit.$url().path,
          pagesPath.products._id(productId).$url().path,
        ],
      });

      toast.success('Товар успешно обновлен');
      router.replace(pagesPath.products.$url().path);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error('Не удалось обновить товар');
    }
  }

  return {
    loading,
    handleSubmit,
  };
}
