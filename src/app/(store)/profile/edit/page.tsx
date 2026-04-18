import type { Metadata } from 'next';

import { buildNoIndexMetadata } from '@/shared/lib/seo';

import { ProfileEditRoute } from '@/routes/profileEdit';

export const metadata: Metadata = {
  ...buildNoIndexMetadata({
    title: 'Edit profile',
    description: 'Private profile editing page.',
  }),
};

export default function ProfileEditPage() {
  return <ProfileEditRoute />;
}
