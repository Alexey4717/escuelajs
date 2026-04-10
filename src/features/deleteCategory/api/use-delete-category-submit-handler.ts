'use client';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { revalidateTagsAction } from '@/shared/api/cache/revalidate-tags.action';
import { DeleteCategoryDocument } from '@/shared/api/generated/graphql';
import { nextCacheTags } from '@/shared/lib/next-cache-tags/tags';
import { pagesPath } from '@/shared/routes/$path';

interface DeleteCategoryArgs {
  categoryId: string;
  closeModal: () => void;
}

export function useDeleteCategorySubmitHandler() {
  const [deleteCategory, { loading }] = useMutation(DeleteCategoryDocument);

  const submitDelete = async ({
    categoryId,
    closeModal,
  }: DeleteCategoryArgs) => {
    try {
      const { data } = await deleteCategory({
        variables: { id: categoryId },
        update(cache) {
          cache.evict({ id: 'ROOT_QUERY', fieldName: 'categories' });
          cache.gc();
        },
      });

      if (!data?.deleteCategory) {
        throw new Error('Не удалось удалить категорию');
      }

      await revalidateTagsAction({
        tags: [nextCacheTags.categories, nextCacheTags.category(categoryId)],
        paths: [pagesPath.categories.$url().path],
      });

      toast.success('Категория удалена');
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error('Не удалось удалить категорию');
    }
  };

  return {
    submitDelete,
    loading,
  };
}
