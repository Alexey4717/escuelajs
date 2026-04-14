'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { clearAuthSession } from '@/shared/api/auth/clear-auth-session';
import { DeleteUserDocument } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/config/routes/$path';
import { evictRootQueryField } from '@/shared/lib/cache/apollo/utils/cache-utils';

type DeleteCurrentUserMutationArgs = {
  userId: string;
  closeModal: () => void;
};

export function useDeleteCurrentUserSubmitHandler() {
  const router = useRouter();
  const [deleteUser, { loading }] = useMutation(DeleteUserDocument);

  const submitDelete = async ({
    userId,
    closeModal,
  }: DeleteCurrentUserMutationArgs) => {
    try {
      await deleteUser({
        variables: { id: userId },
        update(cache) {
          evictRootQueryField(cache, 'users');
        },
      });

      await clearAuthSession();
      closeModal();
      toast.success('Аккаунт удален');
      router.push(pagesPath.login.$url().path);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error('Не удалось удалить аккаунт');
    }
  };

  return {
    submitDelete,
    loading,
  };
}
