import Link from 'next/link';

import { Typography } from '@/shared/ui/Typography/Typography';

interface FormShellFooterProps {
  registerHref: string;
}

export const FormShellFooter = ({ registerHref }: FormShellFooterProps) => (
  <Typography variant="muted" align="center" className="text-[11px]">
    Don&apos;t have an account?{' '}
    <Link
      href={registerHref}
      className="font-medium text-primary underline-offset-2 transition-colors hover:underline"
      prefetch
    >
      Sign up →
    </Link>
  </Typography>
);
