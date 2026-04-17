import { pagesPath } from '@/shared/config/routes/$path';

import { NotFoundPage } from '@/widgets/Page';

export default function CategoryNotFound() {
  return (
    <NotFoundPage
      title="Category"
      listHref={pagesPath.categories.$url().path}
      listLinkLabel="categories list"
    />
  );
}
