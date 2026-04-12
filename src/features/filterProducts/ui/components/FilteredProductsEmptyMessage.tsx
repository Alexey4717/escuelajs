import { Typography } from '@/shared/ui/Typography/Typography';

export const FilteredProductsEmptyMessage = () => (
  <Typography variant="muted" className="block py-12 text-center">
    По заданным фильтрам товары не найдены. Попробуйте изменить условия поиска
    или сбросить фильтры.
  </Typography>
);
