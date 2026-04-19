import type { Metadata } from 'next';

import { buildNoIndexMetadata } from '@/shared/lib/seo';

import { RegisterRoute } from '@/routes/register';

export const metadata: Metadata = {
  ...buildNoIndexMetadata({
    title: 'Register',
    description: 'Create account page for educational storefront.',
  }),
};

export default function RegisterPage() {
  return <RegisterRoute />;
}
