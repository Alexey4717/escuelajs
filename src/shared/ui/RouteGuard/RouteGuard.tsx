'use client';

import { type ReactNode, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { type Role } from '@/shared/api/generated/graphql';

import { useCurrentUserId, useCurrentUserRole } from '@/entities/Session';

interface RouteGuardProps {
  requiredRole: Role;
  redirectTo?: string;
  fallback?: ReactNode;
  children: ReactNode;
}

export function RouteGuard({
  requiredRole,
  redirectTo = '/forbidden',
  fallback = null,
  children,
}: RouteGuardProps) {
  const router = useRouter();
  const userId = useCurrentUserId();
  const { role, loading } = useCurrentUserRole();

  useEffect(() => {
    if (!userId || loading) {
      return;
    }

    if (role !== requiredRole) {
      router.replace(redirectTo);
    }
  }, [loading, redirectTo, requiredRole, role, router, userId]);

  if (!userId || loading) {
    return fallback;
  }

  if (role !== requiredRole) {
    return null;
  }

  return children;
}
