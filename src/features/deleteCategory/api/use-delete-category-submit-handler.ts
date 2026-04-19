'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { DeleteCategoryDocument } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/config/routes/$path';
import { evictRootQueryField } from '@/shared/lib/cache/apollo/utils/cache-utils';
import { revalidateTagsAction } from '@/shared/lib/cache/nextjs/revalidate-tags.action';
import { nextCacheTags } from '@/shared/lib/cache/nextjs/tags';

interface DeleteCategoryArgs {
  categoryId: string;
  closeModal: () => void;
}
export const useDeleteCategorySubmitHandler = () => {
  const router = useRouter();
  const [deleteCategory, { loading }] = useMutation(DeleteCategoryDocument);

  const submitDelete = async ({
    categoryId,
    closeModal,
  }: DeleteCategoryArgs) => {
    try {
      const { data } = await deleteCategory({
        variables: { id: categoryId },
        update(cache) {
          evictRootQueryField(cache, 'categories');
        },
      });

      if (!data?.deleteCategory) {
        throw new Error('Failed to delete category');
      }

      await revalidateTagsAction({
        tags: [nextCacheTags.categories, nextCacheTags.category(categoryId)],
        paths: [
          pagesPath.categories.$url().path,
          pagesPath.categories._id(categoryId).$url().path,
        ],
      });

      toast.success('Category deleted');
      closeModal();

      router.replace(pagesPath.categories.$url().path);
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete category');
    }
  };

  return {
    submitDelete,
    loading,
  };
};
