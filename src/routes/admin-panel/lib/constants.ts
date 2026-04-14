import { pagesPath } from '@/shared/config/routes/$path';

export const adminPanelHeadingPage = 'Админка';

export const addEntitiesButtonsConfig = [
  {
    href: pagesPath.products.create.$url().path,
    title: 'Добавить продукт',
  },
  {
    href: pagesPath.categories.create.$url().path,
    title: 'Добавить категорию',
  },
] as const;
