import { Typography } from '@/shared/ui/Typography/Typography';

import { ScrollPositionSetter } from './components/ScrollPositionSetter';
import { ScrollPositionSetterProps } from './components/types';

export interface PageProps extends ScrollPositionSetterProps {
  heading?: string;
}

export const Page = ({
  children,
  heading,
  className,
  'data-testid': dataTestId,
  mainRef,
  onScrollEnd,
}: PageProps) => {
  return (
    <ScrollPositionSetter
      className={className}
      data-testid={dataTestId}
      mainRef={mainRef}
      onScrollEnd={onScrollEnd}
    >
      {heading && (
        <Typography variant="h1" className="text-left">
          {heading}
        </Typography>
      )}
      {children}
    </ScrollPositionSetter>
  );
};
