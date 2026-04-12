import { useCallback, useEffect, useState } from 'react';

import { NetworkStatus } from '@apollo/client';

import { useDebounce } from '@/shared/lib/hooks/use-debounce';

import { useFilterProductsStore } from '../../model/filter-products-store';

interface UseFilterTitleFieldParams {
  productsNetworkStatus: NetworkStatus;
  resetKey: number;
}

export function useFilterTitleField({
  productsNetworkStatus,
  resetKey,
}: UseFilterTitleFieldParams) {
  const title = useFilterProductsStore((s) => s.title);
  const setTitle = useFilterProductsStore((s) => s.setTitle);

  const [titleInput, setTitleInput] = useState(title);
  const [titleAwaitingNetwork, setTitleAwaitingNetwork] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setTitleInput(title);
    });
  }, [title]);

  useEffect(() => {
    if (productsNetworkStatus !== NetworkStatus.ready) {
      return;
    }
    queueMicrotask(() => {
      setTitleAwaitingNetwork(false);
    });
  }, [productsNetworkStatus]);

  useEffect(() => {
    queueMicrotask(() => {
      setTitleAwaitingNetwork(false);
    });
  }, [resetKey]);

  const debouncedCommitTitle = useDebounce((value: string) => {
    setTitle(value);
    setTitleAwaitingNetwork(true);
  }, 500);

  const onTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      setTitleInput(v);
      debouncedCommitTitle(v);
    },
    [debouncedCommitTitle],
  );

  const titleDebouncing = titleInput !== title;
  const titleLoading =
    titleDebouncing ||
    (titleAwaitingNetwork && productsNetworkStatus !== NetworkStatus.ready);

  return { titleInput, onTitleChange, titleLoading };
}
