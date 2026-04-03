'use client';

import { useMemo } from 'react';

import { useSearchParams } from 'next/navigation';

export const useAuthQuery = () => {
  const searchParams = useSearchParams();

  const authQuery = useMemo(() => {
    const from = searchParams.get('from');
    return from ? `?${new URLSearchParams({ from }).toString()}` : '';
  }, [searchParams]);

  const loginHref = `/login${authQuery}`;
  const registerHref = `/register${authQuery}`;

  return {
    loginHref,
    registerHref,
  };
};
