import { ScrollPositionSetter } from './ScrollPositionSetter';
import { ScrollPositionSetterProps } from './types';

const RootMain = (props: ScrollPositionSetterProps) => {
  const { mainRef, className, children } = props;
  return (
    <main
      ref={mainRef}
      id="main-content"
      tabIndex={-1}
      className={className}
      data-testid={props['data-testid'] ?? 'Page'}
    >
      {children}
    </main>
  );
};

interface PageRootProps extends ScrollPositionSetterProps {
  withSavingScrollPosition?: boolean;
}

export const PageRoot = (props: PageRootProps) => {
  const { withSavingScrollPosition } = props;

  if (withSavingScrollPosition) {
    return <ScrollPositionSetter {...props} />;
  }

  return <RootMain {...props} />;
};
