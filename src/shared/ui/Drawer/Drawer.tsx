'use client';

import { DrawerClose } from './components/DrawerClose';
import { DrawerContent } from './components/DrawerContent';
import { DrawerDescription } from './components/DrawerDescription';
import { DrawerFooter } from './components/DrawerFooter';
import { DrawerHeader } from './components/DrawerHeader';
import { DrawerOverlay } from './components/DrawerOverlay';
import { DrawerPortal } from './components/DrawerPortal';
import { DrawerRoot } from './components/DrawerRoot';
import { DrawerTitle } from './components/DrawerTitle';
import { DrawerTrigger } from './components/DrawerTrigger';
import type { DrawerProps } from './types';

const DrawerBase = ({
  children,
  trigger,
  triggerProps,
  title,
  description,
  content,
  footer,
  overlayProps,
  contentProps,
  headerProps,
  titleProps,
  descriptionProps,
  footerProps,
  showOverlay,
  showHandle,
  ...rootProps
}: DrawerProps) => {
  return (
    <DrawerRoot {...rootProps}>
      {trigger && <DrawerTrigger {...triggerProps}>{trigger}</DrawerTrigger>}

      {children ?? (
        <DrawerContent
          {...contentProps}
          overlayProps={overlayProps}
          showOverlay={showOverlay}
          showHandle={showHandle}
        >
          {(title || description) && (
            <DrawerHeader {...headerProps}>
              {title && <DrawerTitle {...titleProps}>{title}</DrawerTitle>}
              {description && (
                <DrawerDescription {...descriptionProps}>
                  {description}
                </DrawerDescription>
              )}
            </DrawerHeader>
          )}

          {content && <div className="px-4 pb-4">{content}</div>}

          {footer && <DrawerFooter {...footerProps}>{footer}</DrawerFooter>}
        </DrawerContent>
      )}
    </DrawerRoot>
  );
};

type DrawerComponent = typeof DrawerBase & {
  Root: typeof DrawerRoot;
  Trigger: typeof DrawerTrigger;
  Portal: typeof DrawerPortal;
  Close: typeof DrawerClose;
  Overlay: typeof DrawerOverlay;
  Content: typeof DrawerContent;
  Header: typeof DrawerHeader;
  Footer: typeof DrawerFooter;
  Title: typeof DrawerTitle;
  Description: typeof DrawerDescription;
};

export const Drawer = Object.assign(DrawerBase, {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Portal: DrawerPortal,
  Close: DrawerClose,
  Overlay: DrawerOverlay,
  Content: DrawerContent,
  Header: DrawerHeader,
  Footer: DrawerFooter,
  Title: DrawerTitle,
  Description: DrawerDescription,
}) as DrawerComponent;
