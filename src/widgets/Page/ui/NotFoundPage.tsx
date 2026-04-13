import { type ReactNode } from 'react';

import Link from 'next/link';

import { SearchX } from 'lucide-react';

import { cn } from '@/shared/lib/styles/cn';
import { Typography } from '@/shared/ui/Typography/Typography';

import { Page } from './Page';

export interface NotFoundPageProps {
  title: ReactNode;
  listHref: string;
  listLinkLabel: string;
}

export const NotFoundPage = ({
  title,
  listHref,
  listLinkLabel,
}: NotFoundPageProps) => (
  <Page narrow>
    <div className="flex flex-col items-center gap-6 py-4 text-center sm:py-8">
      <div
        className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground"
        aria-hidden
      >
        <SearchX className="h-7 w-7" strokeWidth={1.5} />
      </div>
      <div className="flex max-w-lg flex-col gap-3">
        <Typography component="h1" variant="h2" className="text-balance">
          Не найдено:{' '}
          <span className="font-semibold text-foreground">{title}</span>
        </Typography>
        <Typography variant="muted" className="text-pretty leading-relaxed">
          Возможно, запись была удалена или перемещена. Попробуйте найти её в{' '}
          <Link
            href={listHref}
            className={cn(
              'font-medium text-primary underline-offset-4 transition-colors',
              'hover:underline',
            )}
          >
            {listLinkLabel}
          </Link>
          .
        </Typography>
      </div>
    </div>
  </Page>
);
