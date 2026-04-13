import { pagesPath } from '@/shared/routes/$path';

import { NotFoundPage } from '@/widgets/Page';

export default function ProductNotFound() {
  return (
    <NotFoundPage
      title="Товар"
      listHref={pagesPath.products.$url().path}
      listLinkLabel="каталоге"
    />
  );
}
