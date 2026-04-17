import { Typography } from '@/shared/ui/Typography/Typography';

export const FilteredProductsEmptyMessage = () => (
  <Typography variant="muted" className="block py-12 text-center">
    No products match your filters. Try adjusting your search or reset the
    filters.
  </Typography>
);
