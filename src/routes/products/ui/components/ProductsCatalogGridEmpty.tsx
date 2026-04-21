import Link from 'next/link';

import { pagesPath } from '@/shared/config/routes/$path';
import { ONBOARDING_TARGET_IDS } from '@/shared/lib/onboarding';
import { Button } from '@/shared/ui/Button/Button';
import { Typography } from '@/shared/ui/Typography/Typography';

interface ProductsCatalogGridEmptyCatalogProps {
  isAdmin: boolean;
}

export const ProductsCatalogGridEmptyCatalog = ({
  isAdmin,
}: ProductsCatalogGridEmptyCatalogProps) => (
  <div
    className="flex flex-col items-center gap-4 py-12 text-center"
    data-onboarding={ONBOARDING_TARGET_IDS.productsList}
  >
    <Typography variant="muted">No products in the catalog yet.</Typography>
    {isAdmin ? (
      <Button asChild variant="default">
        <Link href={pagesPath.products.create.$url().path}>Add product</Link>
      </Button>
    ) : null}
  </div>
);
