import Link from 'next/link';

import { FileQuestion } from 'lucide-react';

import { pagesPath } from '@/shared/config/routes/$path';
import { defineIsLoggedIn } from '@/shared/lib/auth/is-logged-in';
import { Button } from '@/shared/ui/Button/Button';
import { Typography } from '@/shared/ui/Typography/Typography';

export default async function GlobalNotFound() {
  const isLoggedIn = await defineIsLoggedIn();

  return (
    <div className="flex min-h-[min(100dvh,100vh)] flex-col items-center justify-center bg-background px-6 py-16">
      <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-xl border border-border bg-card p-8 text-center shadow-sm">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground"
          aria-hidden
        >
          <FileQuestion className="h-7 w-7" strokeWidth={1.5} />
        </div>
        <div className="space-y-2">
          <Typography variant="overline">Error 404</Typography>
          <Typography component="h1" className="text-foreground">
            Page not found
          </Typography>
          <Typography variant="muted" className="text-pretty leading-relaxed">
            The link is outdated, the URL has a typo, or the page was moved.
            Check the address or go back home.
          </Typography>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link href={pagesPath.$url().path}>Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link
              href={
                isLoggedIn
                  ? pagesPath.profile.$url().path
                  : pagesPath.login.$url().path
              }
            >
              {isLoggedIn ? 'Profile' : 'Sign in'}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
