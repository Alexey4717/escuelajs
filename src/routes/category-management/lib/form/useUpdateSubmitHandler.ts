'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { UpdateCategoryDocument } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/config/routes/$path';
import {
  evictRootQueryField,
  updateEntityInCache,
} from '@/shared/lib/cache/apollo/utils/cache-utils';
import { revalidateTagsAction } from '@/shared/lib/cache/nextjs/revalidate-tags.action';
import { nextCacheTags } from '@/shared/lib/cache/nextjs/tags';
import {
  firstUploadedFileUrl,
  uploadQueuedFilesBoxItemsWithLoading,
} from '@/shared/ui/FilesBox';
import type { FilesBoxItem } from '@/shared/ui/FilesBox';

import type { CategoryFormStateOutput } from './schema';

interface UpdateSubmitArgs {
  categoryId: string;
  values: CategoryFormStateOutput;
  imageFiles: FilesBoxItem[];
}

export function useUpdateSubmitHandler() {
  const router = useRouter();
  const [updateCategory, { loading }] = useMutation(UpdateCategoryDocument);
  const [imagesUploadLoading, setImagesUploadLoading] = useState(false);

  async function handleSubmit({
    categoryId,
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
      toast.error('Failed to upload images');
      return filesState;
    }

    const image = firstUploadedFileUrl(filesState);
    if (!image) {
      toast.error('Add at least one image');
      return filesState;
    }

    try {
      const { data } = await updateCategory({
        variables: {
          id: categoryId,
          changes: {
            name: values.name,
            image,
          },
        },
        update(cache, { data: mutationData }) {
          const updatedCategory = mutationData?.updateCategory;
          if (!updatedCategory) return;

          updateEntityInCache({
            cache,
            typename: 'Category',
            id: updatedCategory.id,
            fields: {
              name: updatedCategory.name,
              image: updatedCategory.image,
            },
            fallbackRootFieldName: 'category',
          });

          evictRootQueryField(cache, 'categories');
        },
      });

      if (!data?.updateCategory) {
        throw new Error('Failed to update category');
      }

      await revalidateTagsAction({
        tags: [nextCacheTags.categories, nextCacheTags.category(categoryId)],
        paths: [
          pagesPath.categories.$url().path,
          pagesPath.categories._id(categoryId).edit.$url().path,
        ],
      });

      toast.success('Category updated successfully');
      router.replace(pagesPath.categories.$url().path);
      router.refresh();
      return filesState;
    } catch (err) {
      console.error(err);
      toast.error('Failed to update category');
      return filesState;
    }
  }

  return {
    loading,
    imagesUploadLoading,
    handleSubmit,
  };
}
