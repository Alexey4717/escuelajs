'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { UpdateProductDocument } from '@/shared/api/generated/graphql';
import {
  evictRootQueryField,
  updateEntityInCache,
} from '@/shared/lib/cache/apollo/utils/cache-utils';
import { revalidateTagsAction } from '@/shared/lib/cache/nextjs/revalidate-tags.action';
import { nextCacheTags } from '@/shared/lib/cache/nextjs/tags';
import { pagesPath } from '@/shared/routes/$path';
import {
  collectUploadedFileUrls,
  type FilesBoxItem,
  uploadQueuedFilesBoxItemsWithLoading,
} from '@/shared/ui/FilesBox';

import type { ProductFormStateOutput } from './schema';

interface UpdateSubmitArgs {
  productId: string;
  values: ProductFormStateOutput;
  imageFiles: FilesBoxItem[];
}

export function useUpdateSubmitHandler() {
  const router = useRouter();
  const [updateProduct, { loading }] = useMutation(UpdateProductDocument);
  const [imagesUploadLoading, setImagesUploadLoading] = useState(false);

  async function handleSubmit({
    productId,
    values,
    imageFiles,
  }: UpdateSubmitArgs): Promise<FilesBoxItem[]> {
    let filesState = imageFiles;
    const uploadResult = await uploadQueuedFilesBoxItemsWithLoading(
      imageFiles,
      setImagesUploadLoading,
    );
    filesState = uploadResult.files;
    if (uploadResult.hasUploadError) {
      toast.error('Не удалось загрузить одно или несколько изображений');
      return filesState;
    }

    const images = collectUploadedFileUrls(filesState);
    if (images.length === 0) {
      toast.error('Добавьте хотя бы одно изображение');
      return filesState;
    }

    try {
      const { data } = await updateProduct({
        variables: {
          id: productId,
          changes: {
            title: values.title,
            price: Number(values.price),
            description: values.description,
            categoryId: Number(values.categoryId),
            images,
          },
        },
        update(cache, { data: mutationData }) {
          const updatedProduct = mutationData?.updateProduct;
          if (!updatedProduct) return;

          updateEntityInCache({
            cache,
            typename: 'Product',
            id: updatedProduct.id,
            fields: {
              title: updatedProduct.title,
              price: updatedProduct.price,
              description: updatedProduct.description,
              images: updatedProduct.images,
              category: updatedProduct.category,
            },
            fallbackRootFieldName: 'product',
          });

          evictRootQueryField(cache, 'products');
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
      return filesState;
    } catch (err) {
      console.error(err);
      toast.error('Не удалось обновить товар');
      return filesState;
    }
  }

  return {
    loading,
    imagesUploadLoading,
    handleSubmit,
  };
}
