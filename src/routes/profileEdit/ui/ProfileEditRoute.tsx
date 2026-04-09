'use client';

import { Typography } from '@/shared/ui/Typography/Typography';

import { useCurrentUser } from '@/entities/Session';

import { Page } from '@/widgets/Page';

import { ProfileEditFormCard } from './components/ProfileEditFormCard';

const headingPage = 'Редактировать профиль';

export function ProfileEditRoute() {
  const { user, loading, error } = useCurrentUser();

  if (error) {
    return (
      <Page narrow heading={headingPage}>
        <Typography variant="body1" component="p">
          Не удалось загрузить данные пользователя
        </Typography>
      </Page>
    );
  }

  if (loading || !user?.id) {
    return (
      <Page narrow heading={headingPage}>
        <Typography variant="body1" component="p">
          Загрузка данных профиля...
        </Typography>
      </Page>
    );
  }

  return (
    <Page narrow heading={headingPage}>
      <ProfileEditFormCard user={user} />
    </Page>
  );
}
