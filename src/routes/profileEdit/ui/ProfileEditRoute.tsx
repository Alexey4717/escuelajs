'use client';

import { Typography } from '@/shared/ui/Typography/Typography';

import { useCurrentUser } from '@/entities/Session';

import { Page } from '@/widgets/Page';

import { ProfileEditFormCard } from './components/ProfileEditFormCard';
import { ProfileEditLoadPage } from './ProfileEditLoadPage';

const headingPage = 'Edit profile';

export const ProfileEditRoute = () => {
  const { user, loading, error } = useCurrentUser();

  if (error) {
    return (
      <Page narrow heading={headingPage}>
        <Typography variant="body1" component="p">
          Failed to load user data
        </Typography>
      </Page>
    );
  }

  if (loading || !user?.id) {
    return <ProfileEditLoadPage />;
  }

  return (
    <Page narrow heading={headingPage}>
      <ProfileEditFormCard user={user} />
    </Page>
  );
};
