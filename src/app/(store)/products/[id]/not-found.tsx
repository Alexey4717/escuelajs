import { pagesPath } from '@/shared/config/routes/$path';

import { NotFoundPage } from '@/widgets/Page';

export default function ProductNotFound() {
  return (
    <NotFoundPage
      title="Product"
      listHref={pagesPath.products.$url().path}
      listLinkLabel="catalog"
    />
  );
}
