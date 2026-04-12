'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { AddProductDocument } from '@/shared/api/generated/graphql';
import { evictRootQueryField } from '@/shared/lib/cache/apollo/utils/cache-utils';
import { revalidateTagsAction } from '@/shared/lib/cache/nextjs/revalidate-tags.action';
import { nextCacheTags } from '@/shared/lib/next-cache-tags/tags';
import { pagesPath } from '@/shared/routes/$path';
import {
  collectUploadedFileUrls,
  type FilesBoxItem,
  uploadQueuedFilesBoxItemsWithLoading,
} from '@/shared/ui/FilesBox';

import type { ProductFormStateOutput } from './schema';

interface CreateSubmitArgs {
  values: ProductFormStateOutput;
  imageFiles: FilesBoxItem[];
}

export function useCreateSubmitHandler() {
  const router = useRouter();
  const [addProduct, { loading }] = useMutation(AddProductDocument);
  const [imagesUploadLoading, setImagesUploadLoading] = useState(false);

  async function handleSubmit({
    values,
    imageFiles,
  }: CreateSubmitArgs): Promise<FilesBoxItem[]> {
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
      const { data } = await addProduct({
        variables: {
          data: {
            title: values.title,
            price: Number(values.price),
            description: values.description,
            categoryId: Number(values.categoryId),
            images,
          },
        },
        update(cache) {
          evictRootQueryField(cache, 'products');
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
      return filesState;
    } catch (err) {
      console.error(err);
      toast.error('Не удалось создать товар');
      return filesState;
    }
  }

  return {
    loading,
    imagesUploadLoading,
    handleSubmit,
  };
}
