'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { AddProductDocument } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/config/routes/$path';
import { evictRootQueryField } from '@/shared/lib/cache/apollo/utils/cache-utils';
import { revalidateTagsAction } from '@/shared/lib/cache/nextjs/revalidate-tags.action';
import { nextCacheTags } from '@/shared/lib/cache/nextjs/tags';
import {
  collectUploadedFileUrls,
  type FilesBoxItem,
  uploadQueuedFilesBoxItemsWithLoading,
} from '@/shared/ui/FilesBox';

import { useOnboardingSessionStore } from '@/features/onboarding';

import type { ProductFormStateOutput } from './schema';

interface CreateSubmitArgs {
  values: ProductFormStateOutput;
  imageFiles: FilesBoxItem[];
}

export const useCreateSubmitHandler = () => {
  const router = useRouter();
  const [addProduct, { loading }] = useMutation(AddProductDocument);
  const [imagesUploadLoading, setImagesUploadLoading] = useState(false);
  const isAdminOnboardingCreateStep = useOnboardingSessionStore(
    (s) =>
      s.isDemoActive && s.activeFlow === 'admin' && s.currentStepIndex === 7,
  );

  const handleSubmit = async ({
    values,
    imageFiles,
  }: CreateSubmitArgs): Promise<FilesBoxItem[]> => {
    if (isAdminOnboardingCreateStep) {
      toast.success('Demo product created');
      router.replace(pagesPath.products.$url().path);
      return imageFiles;
    }

    let filesState = imageFiles;
    const uploadResult = await uploadQueuedFilesBoxItemsWithLoading(
      imageFiles,
      setImagesUploadLoading,
    );
    filesState = uploadResult.files;
    if (uploadResult.hasUploadError) {
      toast.error('Failed to upload one or more images');
      return filesState;
    }

    const images = collectUploadedFileUrls(filesState);
    if (images.length === 0) {
      toast.error('Add at least one image');
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
        throw new Error('Failed to get created product');
      }

      await revalidateTagsAction({
        tags: [nextCacheTags.products, nextCacheTags.product(createdProductId)],
        paths: [
          pagesPath.products.$url().path,
          pagesPath.products._id(createdProductId).edit.$url().path,
          pagesPath.products._id(createdProductId).$url().path,
        ],
      });

      toast.success('Product created successfully');
      router.replace(pagesPath.products.$url().path);
      router.refresh();
      return filesState;
    } catch (err) {
      console.error(err);
      toast.error('Failed to create product');
      return filesState;
    }
  };

  return {
    loading,
    imagesUploadLoading,
    handleSubmit,
  };
};
