import { Suspense } from 'react';

import type { Metadata } from 'next';

import { buildNoIndexMetadata } from '@/shared/lib/seo';

import { LoginLoadPage, LoginRoute } from '@/routes/login';

export const metadata: Metadata = {
  ...buildNoIndexMetadata({
    title: 'Login',
    description: 'Sign in to access private account routes.',
  }),
};

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoadPage />}>
      <LoginRoute />
    </Suspense>
  );
}
