import type { Metadata } from 'next';
import Link from 'next/link';

import { pagesPath } from '@/shared/routes/$path';
import { Typography } from '@/shared/ui/Typography/Typography';

import { Page } from '@/widgets/Page';

export const metadata: Metadata = {
  title: 'Доступ запрещен',
  description: 'Страница ограничения доступа по роли пользователя.',
};

// Страница без данных: всегда один и тот же UI.
export default function ForbiddenPage() {
  return (
    <Page narrow heading="Доступ запрещен">
      <Typography variant="body1" component="p">
        Данный контент для вас недоступен.
      </Typography>
      <Typography
        variant="body2"
        component="p"
        className="text-muted-foreground"
      >
        Необходимо иметь роль admin.
      </Typography>
      <Link
        className="inline-block underline"
        href={pagesPath.profile.edit.$url().path}
      >
        Перейти к редактированию профиля
      </Link>
    </Page>
  );
}
