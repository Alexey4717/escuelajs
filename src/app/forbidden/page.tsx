import type { Metadata } from 'next';
import Link from 'next/link';

import { pagesPath } from '@/shared/config/routes/$path';
import { buildNoIndexMetadata } from '@/shared/lib/seo';
import { Typography } from '@/shared/ui/Typography/Typography';

import { Page } from '@/widgets/Page';

export const metadata: Metadata = {
  ...buildNoIndexMetadata({
    title: 'Access denied',
    description: 'Access restriction page based on user role.',
  }),
};

// Страница без данных: всегда один и тот же UI.
export default function ForbiddenPage() {
  return (
    <Page narrow heading="Access denied">
      <Typography variant="body1" component="p">
        This content is not available for your account.
      </Typography>
      <Typography
        variant="body2"
        component="p"
        className="text-muted-foreground"
      >
        Admin role is required.
      </Typography>
      <Link
        className="inline-block underline"
        href={pagesPath.profile.edit.$url().path}
      >
        Go to profile settings
      </Link>
    </Page>
  );
}
