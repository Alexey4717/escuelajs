import { useCallback, useEffect, useState } from 'react';

import { NetworkStatus } from '@apollo/client';

import { useDebounce } from '@/shared/lib/hooks/use-debounce';

import {
  FILTER_PRICE_SLIDER_MAX,
  FILTER_PRICE_SLIDER_MIN,
} from '../../model/constants';
import { useFilterProductsStore } from '../../model/filter-products-store';

type UseFilterPriceRangeFieldParams = {
  productsNetworkStatus: NetworkStatus;
  resetKey: number;
};
export const useFilterPriceRangeField = ({
  productsNetworkStatus,
  resetKey,
}: UseFilterPriceRangeFieldParams) => {
  const priceMin = useFilterProductsStore((s) => s.priceMin);
  const priceMax = useFilterProductsStore((s) => s.priceMax);
  const setPriceRange = useFilterProductsStore((s) => s.setPriceRange);

  const [priceRangeLocal, setPriceRangeLocal] = useState<[number, number]>([
    priceMin,
    priceMax,
  ]);
  const [priceAwaitingNetwork, setPriceAwaitingNetwork] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setPriceRangeLocal([priceMin, priceMax]);
    });
  }, [priceMin, priceMax]);

  useEffect(() => {
    if (productsNetworkStatus !== NetworkStatus.ready) {
      return;
    }
    queueMicrotask(() => {
      setPriceAwaitingNetwork(false);
    });
  }, [productsNetworkStatus]);

  useEffect(() => {
    queueMicrotask(() => {
      setPriceAwaitingNetwork(false);
    });
  }, [resetKey]);

  const debouncedCommitPrice = useDebounce((min: number, max: number) => {
    setPriceRange(min, max);
    setPriceAwaitingNetwork(true);
  }, 500);

  const onPriceSliderChange = useCallback(
    (value: number[]) => {
      if (value.length < 2) {
        return;
      }
      const next: [number, number] = [value[0]!, value[1]!];
      setPriceRangeLocal(next);
      debouncedCommitPrice(next[0], next[1]);
    },
    [debouncedCommitPrice],
  );

  const priceDebouncing =
    priceRangeLocal[0] !== priceMin || priceRangeLocal[1] !== priceMax;
  const priceLoading =
    priceDebouncing ||
    (priceAwaitingNetwork && productsNetworkStatus !== NetworkStatus.ready);

  const trackRange = FILTER_PRICE_SLIDER_MAX - FILTER_PRICE_SLIDER_MIN;
  const thumbMinFrac =
    trackRange > 0
      ? (priceRangeLocal[0] - FILTER_PRICE_SLIDER_MIN) / trackRange
      : 0;
  const thumbMaxFrac =
    trackRange > 0
      ? (priceRangeLocal[1] - FILTER_PRICE_SLIDER_MIN) / trackRange
      : 1;

  return {
    priceRangeLocal,
    onPriceSliderChange,
    priceLoading,
    thumbMinFrac,
    thumbMaxFrac,
  };
};
