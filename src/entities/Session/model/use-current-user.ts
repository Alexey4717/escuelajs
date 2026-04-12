'use client';

import { skipToken, useQuery } from '@apollo/client/react';

import { UserDetailsDocument } from '@/shared/api/generated/graphql';

import { parseUserRole } from '@/entities/User/@x/session';

import { useCurrentUserId } from './use-current-user-id';

export function useCurrentUser() {
  const userId = useCurrentUserId();
  const { data, loading, error } = useQuery(
    UserDetailsDocument,
    userId
      ? {
          variables: { id: userId },
          fetchPolicy: 'cache-first',
          nextFetchPolicy: 'cache-first',
        }
      : skipToken,
  );

  const user = data?.user ?? null;

  return {
    userId,
    user,
    loading: Boolean(userId) && loading,
    error,
  };
}

export function useCurrentUserRole() {
  const { user, loading } = useCurrentUser();

  return {
    role: user?.role ? parseUserRole(user.role) : null,
    loading,
  };
}

export function useCurrentUserPassword() {
  const { user, userId, loading } = useCurrentUser();

  return {
    userId,
    loading,
    profilePassword: user?.password ?? null,
  };
}
