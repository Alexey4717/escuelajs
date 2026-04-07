import { type ReactNode } from 'react';

import { cn } from '@/shared/lib/styles/cn';
import { Typography } from '@/shared/ui/Typography/Typography';

import { PageRoot } from './components/PageRoot';
import { ScrollPositionSetterProps } from './components/types';

export interface PageProps extends ScrollPositionSetterProps {
  heading?: ReactNode;
  withSavingScrollPosition?: boolean;
  narrow?: boolean;
}

export const Page = ({
  children,
  heading,
  withSavingScrollPosition = false,
  narrow = false,
  className,
  'data-testid': dataTestId,
  mainRef,
  onScrollEnd,
}: PageProps) => {
  return (
    <PageRoot
      withSavingScrollPosition={withSavingScrollPosition}
      className={cn(
        narrow && 'w-full lg:mx-auto lg:max-w-6xl space-y-6',
        className,
      )}
      data-testid={dataTestId}
      mainRef={mainRef}
      onScrollEnd={onScrollEnd}
    >
      {typeof heading === 'string' ? (
        <Typography variant="h1" className="text-left">
          {heading}
        </Typography>
      ) : (
        (heading ?? null)
      )}
      {children}
    </PageRoot>
  );
};
