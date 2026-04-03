'use client';

import { useMemo } from 'react';

import { useSearchParams } from 'next/navigation';

export const useRegisterHref = () => {
  const searchParams = useSearchParams();

  const authQuery = useMemo(() => {
    const from = searchParams.get('from');
    return from ? `?${new URLSearchParams({ from }).toString()}` : '';
  }, [searchParams]);

  return `/register${authQuery}`;
};
