'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { clearAuthSession } from '@/shared/api/auth/clear-auth-session';
import { DeleteUserDocument } from '@/shared/api/generated/graphql';

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
          cache.evict({ id: 'ROOT_QUERY', fieldName: 'users' });
          cache.gc();
        },
      });

      await clearAuthSession();
      closeModal();
      toast.success('Аккаунт удален');
      router.push('/login');
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
