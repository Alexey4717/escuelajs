'use client';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import {
  UpdateUserDocument,
  User_DetailsFragmentDoc,
} from '@/shared/api/generated/graphql';
import { writeEntityFragmentToCache } from '@/shared/lib/cache/apollo/utils/cache-utils';

import { useCurrentUserId } from '@/entities/Session';

interface ChangeCurrentPasswordArgs {
  password: string;
  onSuccess?: () => void;
}

export function useChangeCurrentPasswordSubmitHandler() {
  const [updateUser, { loading }] = useMutation(UpdateUserDocument);

  const userId = useCurrentUserId();

  async function submitChangePassword({
    password,
    onSuccess,
  }: ChangeCurrentPasswordArgs) {
    try {
      if (!userId) {
        throw new Error('Unable to resolve current user id');
      }

      await updateUser({
        variables: {
          id: userId,
          changes: { password },
        },
        update(cache, { data: mutationData }) {
          const updatedUser = mutationData?.updateUser;
          if (!updatedUser) return;

          writeEntityFragmentToCache({
            cache,
            entity: updatedUser,
            fragment: User_DetailsFragmentDoc,
          });
        },
      });

      toast.success('Password changed successfully');
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error('Failed to change password');
    }
  }

  return {
    submitChangePassword,
    loading,
  };
}
