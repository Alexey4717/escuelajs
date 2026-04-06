'use client';

import { DialogClose } from './components/DialogClose';
import { DialogContent } from './components/DialogContent';
import { DialogDescription } from './components/DialogDescription';
import { DialogFooter } from './components/DialogFooter';
import { DialogHeader } from './components/DialogHeader';
import { DialogOverlay } from './components/DialogOverlay';
import { DialogPortal } from './components/DialogPortal';
import { DialogRoot } from './components/DialogRoot';
import { DialogTitle } from './components/DialogTitle';
import { DialogTrigger } from './components/DialogTrigger';
import type { DialogProps } from './types';

const DialogBase = ({
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
  showContentCloseButton,
  showFooterCloseButton,
  ...rootProps
}: DialogProps) => {
  return (
    <DialogRoot {...rootProps}>
      {trigger && <DialogTrigger {...triggerProps}>{trigger}</DialogTrigger>}

      {children ?? (
        <DialogContent
          {...contentProps}
          overlayProps={overlayProps}
          showCloseButton={showContentCloseButton}
        >
          {(title || description) && (
            <DialogHeader {...headerProps}>
              {title && <DialogTitle {...titleProps}>{title}</DialogTitle>}
              {description && (
                <DialogDescription {...descriptionProps}>
                  {description}
                </DialogDescription>
              )}
            </DialogHeader>
          )}

          {content}

          {(footer || showFooterCloseButton) && (
            <DialogFooter
              {...footerProps}
              showCloseButton={showFooterCloseButton}
            >
              {footer}
            </DialogFooter>
          )}
        </DialogContent>
      )}
    </DialogRoot>
  );
};

type DialogComponent = typeof DialogBase & {
  Root: typeof DialogRoot;
  Trigger: typeof DialogTrigger;
  Portal: typeof DialogPortal;
  Close: typeof DialogClose;
  Overlay: typeof DialogOverlay;
  Content: typeof DialogContent;
  Header: typeof DialogHeader;
  Footer: typeof DialogFooter;
  Title: typeof DialogTitle;
  Description: typeof DialogDescription;
};

export const Dialog = Object.assign(DialogBase, {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Close: DialogClose,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
}) as DialogComponent;
