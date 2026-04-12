'use client';

import { useCallback, useState } from 'react';

import { NetworkStatus } from '@apollo/client';

import { useFilterProductsStore } from '../model/filter-products-store';
import { FilterCategoryField } from './components/FilterCategoryField';
import { FilterPriceRangeField } from './components/FilterPriceRangeField';
import { FilterProductsBarHeader } from './components/FilterProductsBarHeader';
import { FilterTitleField } from './components/FilterTitleField';

interface FilterProductsBarProps {
  /** Статус сетевого запроса списка продуктов (`useQuery` + `notifyOnNetworkStatusChange`). */
  productsNetworkStatus: NetworkStatus;
}

export function FilterProductsBar({
  productsNetworkStatus,
}: FilterProductsBarProps) {
  const resetStore = useFilterProductsStore((s) => s.reset);

  const [filterResetKey, setFilterResetKey] = useState(0);

  const handleReset = useCallback(() => {
    resetStore();
    setFilterResetKey((k) => k + 1);
  }, [resetStore]);

  return (
    <section
      className="space-y-4 rounded-lg border border-border bg-card/40 p-4"
      aria-labelledby="filter-products-heading"
    >
      <FilterProductsBarHeader onReset={handleReset} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start lg:gap-x-6 lg:gap-y-6">
        <FilterTitleField
          productsNetworkStatus={productsNetworkStatus}
          resetKey={filterResetKey}
        />
        <FilterCategoryField />
        <FilterPriceRangeField
          productsNetworkStatus={productsNetworkStatus}
          resetKey={filterResetKey}
        />
      </div>
    </section>
  );
}
