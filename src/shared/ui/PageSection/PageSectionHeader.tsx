import { type ReactNode } from 'react';

import { cn } from '../../lib/styles/cn';
import { Typography } from '../Typography/Typography';

const titleUnderlineClassName = cn(
  'mx-auto w-fit max-w-full border-b border-border pb-2',
  '[&_[data-slot=typography]]:border-0 [&_[data-slot=typography]]:pb-0',
);

export interface PageSectionHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  titleId?: string;
  description?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}

export const PageSectionHeader = ({
  eyebrow,
  title,
  titleId,
  description,
  trailing,
  className,
}: PageSectionHeaderProps) => (
  <header className={cn('flex flex-col items-center text-center', className)}>
    {eyebrow ? (
      <div className="mb-3 flex w-full justify-center">{eyebrow}</div>
    ) : null}
    <div className={titleUnderlineClassName}>
      {typeof title === 'string' ? (
        <Typography id={titleId} variant="h2" className="text-balance">
          {title}
        </Typography>
      ) : (
        title
      )}
    </div>
    {description ? (
      <Typography variant="muted" className="mx-auto mt-4 max-w-xl text-pretty">
        {description}
      </Typography>
    ) : null}
    {trailing ? (
      <div className="mt-3 flex w-full flex-wrap items-center justify-center gap-3">
        {trailing}
      </div>
    ) : null}
  </header>
);
