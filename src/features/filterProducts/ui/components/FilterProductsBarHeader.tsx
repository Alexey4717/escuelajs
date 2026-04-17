import { Button } from '@/shared/ui/Button/Button';
import { Typography } from '@/shared/ui/Typography/Typography';

import { useFilterProductsStore } from '../../model/filter-products-store';
import { hasActiveFilters } from '../../model/has-active-filters';

interface FilterProductsBarHeaderProps {
  onReset: () => void;
}

export function FilterProductsBarHeader({
  onReset,
}: FilterProductsBarHeaderProps) {
  const title = useFilterProductsStore((s) => s.title);
  const categoryId = useFilterProductsStore((s) => s.categoryId);
  const priceMin = useFilterProductsStore((s) => s.priceMin);
  const priceMax = useFilterProductsStore((s) => s.priceMax);

  const filtersActive = hasActiveFilters({
    title,
    categoryId,
    priceMin,
    priceMax,
  });

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Typography
        id="filter-products-heading"
        variant="h2"
        className="text-base font-semibold"
      >
        Filters
      </Typography>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="text-muted-foreground"
        onClick={onReset}
        disabled={!filtersActive}
      >
        Reset filters
      </Button>
    </div>
  );
}
