import { pagesPath } from '@/shared/routes/$path';

import { NotFoundPage } from '@/widgets/Page';

export default function CategoryNotFound() {
  return (
    <NotFoundPage
      title="Категория"
      listHref={pagesPath.categories.$url().path}
      listLinkLabel="списке категорий"
    />
  );
}
