'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { UpdateUserDocument } from '@/shared/api/generated/graphql';
import {
  evictRootQueryField,
  updateEntityInCache,
} from '@/shared/lib/cache/apollo/utils/cache-utils';
import { revalidateTagsAction } from '@/shared/lib/cache/nextjs/revalidate-tags.action';
import { nextCacheTags } from '@/shared/lib/next-cache-tags/tags';
import { pagesPath } from '@/shared/routes/$path';

import type { ProfileEditFormStateOutput } from './schema';

interface SubmitArgs {
  userId: string;
  values: ProfileEditFormStateOutput;
}

export function useSubmitHandler() {
  const router = useRouter();
  const [updateUser, { loading }] = useMutation(UpdateUserDocument);

  async function handleSubmit({ userId, values }: SubmitArgs) {
    try {
      const { data } = await updateUser({
        variables: {
          id: userId,
          changes: {
            email: values.email,
            name: values.name,
            role: values.role,
            avatar: values.avatar,
          },
        },
        update(cache, { data: mutationData }) {
          const updatedUser = mutationData?.updateUser;
          if (!updatedUser) return;

          updateEntityInCache({
            cache,
            typename: 'User',
            id: updatedUser.id,
            fields: {
              name: updatedUser.name,
              email: updatedUser.email,
              role: updatedUser.role,
              avatar: updatedUser.avatar,
            },
          });

          evictRootQueryField(cache, 'users');
        },
      });

      if (!data?.updateUser) {
        throw new Error('Не удалось получить обновленные данные пользователя');
      }

      await revalidateTagsAction({
        tags: [nextCacheTags.users, nextCacheTags.user(userId)],
        paths: [pagesPath.profile.$url().path, pagesPath.users.$url().path],
      });
      toast.success('Профиль успешно обновлен');
      router.replace(pagesPath.profile.$url().path);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error('Не удалось обновить профиль');
    }
  }

  return {
    loading,
    handleSubmit,
  };
}
