'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { revalidateTagsAction } from '@/shared/api/cache/revalidate-tags.action';
import { AddProductDocument } from '@/shared/api/generated/graphql';
import { nextCacheTags } from '@/shared/lib/next-cache-tags/tags';
import { pagesPath } from '@/shared/routes/$path';

import type { ProductFormStateOutput } from './schema';

interface CreateSubmitArgs {
  values: ProductFormStateOutput;
}

export function useCreateSubmitHandler() {
  const router = useRouter();
  const [addProduct, { loading }] = useMutation(AddProductDocument);

  async function handleSubmit({ values }: CreateSubmitArgs) {
    try {
      const { data } = await addProduct({
        variables: {
          data: {
            title: values.title,
            price: Number(values.price),
            description: values.description,
            categoryId: Number(values.categoryId),
            images: [values.image],
          },
        },
        update(cache) {
          cache.evict({ id: 'ROOT_QUERY', fieldName: 'products' });
          cache.gc();
        },
      });

      const createdProductId = data?.addProduct?.id;
      if (!createdProductId) {
        throw new Error('Не удалось получить созданный товар');
      }

      await revalidateTagsAction({
        tags: [nextCacheTags.products, nextCacheTags.product(createdProductId)],
        paths: [
          pagesPath.products.$url().path,
          pagesPath.products._id(createdProductId).edit.$url().path,
          pagesPath.products._id(createdProductId).$url().path,
        ],
      });

      toast.success('Товар успешно создан');
      router.replace(pagesPath.products.$url().path);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error('Не удалось создать товар');
    }
  }

  return {
    loading,
    handleSubmit,
  };
}
