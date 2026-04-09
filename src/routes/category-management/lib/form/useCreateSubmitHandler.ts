'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { revalidateTagsAction } from '@/shared/api/cache/revalidate-tags.action';
import { AddCategoryDocument } from '@/shared/api/generated/graphql';
import { nextCacheTags } from '@/shared/lib/next-cache-tags/tags';
import { pagesPath } from '@/shared/routes/$path';

import type { CategoryFormStateOutput } from './schema';

interface CreateSubmitArgs {
  values: CategoryFormStateOutput;
}

export function useCreateSubmitHandler() {
  const router = useRouter();
  const [addCategory, { loading }] = useMutation(AddCategoryDocument);

  async function handleSubmit({ values }: CreateSubmitArgs) {
    try {
      const { data } = await addCategory({
        variables: {
          data: {
            name: values.name,
            image: values.image,
          },
        },
        update(cache) {
          cache.evict({ id: 'ROOT_QUERY', fieldName: 'categories' });
          cache.gc();
        },
      });

      const createdCategoryId = data?.addCategory?.id;
      if (!createdCategoryId) {
        throw new Error('Не удалось получить созданную категорию');
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

      toast.success('Категория успешно создана');
      router.replace(pagesPath.categories.$url().path);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error('Не удалось создать категорию');
    }
  }

  return {
    loading,
    handleSubmit,
  };
}
