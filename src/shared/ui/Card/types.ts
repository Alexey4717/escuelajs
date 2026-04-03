import type * as React from 'react';

export type CardSize = 'default' | 'sm';

export type CardRootProps = React.ComponentProps<'div'> & {
  size?: CardSize;
};
