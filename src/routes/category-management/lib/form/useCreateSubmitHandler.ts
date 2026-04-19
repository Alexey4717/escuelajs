'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { AddCategoryDocument } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/config/routes/$path';
import { evictRootQueryField } from '@/shared/lib/cache/apollo/utils/cache-utils';
import { revalidateTagsAction } from '@/shared/lib/cache/nextjs/revalidate-tags.action';
import { nextCacheTags } from '@/shared/lib/cache/nextjs/tags';
import {
  firstUploadedFileUrl,
  uploadQueuedFilesBoxItemsWithLoading,
} from '@/shared/ui/FilesBox';
import type { FilesBoxItem } from '@/shared/ui/FilesBox';

import { useOnboardingSessionStore } from '@/features/onboarding';

import type { CategoryFormStateOutput } from './schema';

interface CreateSubmitArgs {
  values: CategoryFormStateOutput;
  imageFiles: FilesBoxItem[];
}

export const useCreateSubmitHandler = () => {
  const router = useRouter();
  const [addCategory, { loading }] = useMutation(AddCategoryDocument);
  const [imagesUploadLoading, setImagesUploadLoading] = useState(false);
  const isAdminOnboardingCreateStep = useOnboardingSessionStore(
    (s) =>
      s.isDemoActive && s.activeFlow === 'admin' && s.currentStepIndex === 4,
  );

  const handleSubmit = async ({
    values,
    imageFiles,
  }: CreateSubmitArgs): Promise<FilesBoxItem[]> => {
    if (isAdminOnboardingCreateStep) {
      toast.success('Demo category created');
      router.replace(pagesPath.categories.$url().path);
      return imageFiles;
    }

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
      const { data } = await addCategory({
        variables: {
          data: {
            name: values.name,
            image,
          },
        },
        update(cache) {
          evictRootQueryField(cache, 'categories');
        },
      });

      const createdCategoryId = data?.addCategory?.id;
      if (!createdCategoryId) {
        throw new Error('Failed to get created category');
      }

      await revalidateTagsAction({
        tags: [
          nextCacheTags.categories,
          nextCacheTags.category(createdCategoryId),
        ],
        paths: [
          pagesPath.categories.$url().path,
          pagesPath.categories._id(createdCategoryId).edit.$url().path,
        ],
      });

      toast.success('Category created successfully');
      router.replace(pagesPath.categories.$url().path);
      router.refresh();
      return filesState;
    } catch (err) {
      console.error(err);
      toast.error('Failed to create category');
      return filesState;
    }
  };

  return {
    loading,
    imagesUploadLoading,
    handleSubmit,
  };
};
