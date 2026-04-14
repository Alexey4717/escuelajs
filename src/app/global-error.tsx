'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import { AlertTriangle } from 'lucide-react';

import { pagesPath } from '@/shared/config/routes/$path';
import { Button } from '@/shared/ui/Button/Button';
import { Typography } from '@/shared/ui/Typography/Typography';

import './globals.css';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col overflow-y-auto bg-background font-sans text-[14px] text-foreground antialiased">
        <div className="flex min-h-[min(100dvh,100vh)] flex-1 flex-col items-center justify-center px-6 py-16">
          <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-xl border border-border bg-card p-8 text-center shadow-sm">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive"
              aria-hidden
            >
              <AlertTriangle className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <div className="space-y-2">
              <Typography variant="overline">Критическая ошибка</Typography>
              <Typography component="h1" className="text-foreground">
                Не удалось загрузить приложение
              </Typography>
              <Typography
                variant="muted"
                className="text-pretty leading-relaxed"
              >
                Сбой в корневом макете. Обновите страницу или откройте сайт
                заново.
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
      </body>
    </html>
  );
}
