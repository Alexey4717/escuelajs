'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { DeleteCategoryDocument } from '@/shared/api/generated/graphql';
import { evictRootQueryField } from '@/shared/lib/cache/apollo/utils/cache-utils';
import { revalidateTagsAction } from '@/shared/lib/cache/nextjs/revalidate-tags.action';
import { nextCacheTags } from '@/shared/lib/cache/nextjs/tags';
import { pagesPath } from '@/shared/routes/$path';

interface DeleteCategoryArgs {
  categoryId: string;
  closeModal: () => void;
}

export function useDeleteCategorySubmitHandler() {
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
        throw new Error('Не удалось удалить категорию');
      }

      await revalidateTagsAction({
        tags: [nextCacheTags.categories, nextCacheTags.category(categoryId)],
        paths: [
          pagesPath.categories.$url().path,
          pagesPath.categories._id(categoryId).$url().path,
        ],
      });

      toast.success('Категория удалена');
      closeModal();

      router.replace(pagesPath.categories.$url().path);
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
