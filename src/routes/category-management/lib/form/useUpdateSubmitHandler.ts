'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { UpdateCategoryDocument } from '@/shared/api/generated/graphql';
import {
  evictRootQueryField,
  updateEntityInCache,
} from '@/shared/lib/cache/apollo/utils/cache-utils';
import { revalidateTagsAction } from '@/shared/lib/cache/nextjs/revalidate-tags.action';
import { nextCacheTags } from '@/shared/lib/next-cache-tags/tags';
import { pagesPath } from '@/shared/routes/$path';

import type { CategoryFormStateOutput } from './schema';

interface UpdateSubmitArgs {
  categoryId: string;
  values: CategoryFormStateOutput;
}

export function useUpdateSubmitHandler() {
  const router = useRouter();
  const [updateCategory, { loading }] = useMutation(UpdateCategoryDocument);

  async function handleSubmit({ categoryId, values }: UpdateSubmitArgs) {
    try {
      const { data } = await updateCategory({
        variables: {
          id: categoryId,
          changes: {
            name: values.name,
            image: values.image,
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
        throw new Error('Не удалось обновить категорию');
      }

      await revalidateTagsAction({
        tags: [nextCacheTags.categories, nextCacheTags.category(categoryId)],
        paths: [
          pagesPath.categories.$url().path,
          pagesPath.categories._id(categoryId).edit.$url().path,
        ],
      });

      toast.success('Категория успешно обновлена');
      router.replace(pagesPath.categories.$url().path);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error('Не удалось обновить категорию');
    }
  }

  return {
    loading,
    handleSubmit,
  };
}
