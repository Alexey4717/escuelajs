'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import { AlertTriangle } from 'lucide-react';

import { pagesPath } from '@/shared/routes/$path';
import { Button } from '@/shared/ui/Button/Button';
import { Typography } from '@/shared/ui/Typography/Typography';

interface AppErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AppError({ error, reset }: AppErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[min(100dvh,100vh)] flex-col items-center justify-center bg-background px-6 py-16">
      <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-xl border border-border bg-card p-8 text-center shadow-sm">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive"
          aria-hidden
        >
          <AlertTriangle className="h-7 w-7" strokeWidth={1.5} />
        </div>
        <div className="space-y-2">
          <Typography variant="overline">Ошибка</Typography>
          <Typography component="h1" className="text-foreground">
            Что-то пошло не так
          </Typography>
          <Typography variant="muted" className="text-pretty leading-relaxed">
            Произошла непредвиденная ошибка. Попробуйте обновить страницу или
            вернуться на главную.
          </Typography>
          {process.env.NODE_ENV === 'development' && error.digest ? (
            <Typography
              variant="muted"
              className="font-mono text-xs break-all text-muted-foreground"
            >
              {error.digest}
            </Typography>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button type="button" onClick={() => reset()}>
            Попробовать снова
          </Button>
          <Button asChild variant="outline">
            <Link href={pagesPath.$url().path}>На главную</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
