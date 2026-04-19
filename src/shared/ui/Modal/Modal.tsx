'use client';

import dynamic from 'next/dynamic';

import type { ModalProps } from './types';

const DynamicDialog = dynamic(() =>
  import('@/shared/ui/Dialog/Dialog').then((m) => ({ default: m.Dialog })),
);

const DynamicDrawer = dynamic(() =>
  import('@/shared/ui/Drawer/Drawer').then((m) => ({ default: m.Drawer })),
);

export const Modal = ({
  isMobile = false,
  preserveMounted = false,
  open,
  defaultOpen,
  onOpenChange,
  children,
  title,
  description,
  content,
  footer,
  overlayProps,
  headerProps,
  titleProps,
  descriptionProps,
  footerProps,
  showOverlay,
  showHandle,
  showContentCloseButton,
  showFooterCloseButton,
  dialogClassName,
}: ModalProps) => {
  if (isMobile) {
    return (
      <DynamicDrawer
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
        direction="bottom"
        title={title}
        description={description}
        content={content}
        footer={footer}
        overlayProps={overlayProps}
        headerProps={headerProps}
        titleProps={titleProps}
        descriptionProps={descriptionProps}
        footerProps={footerProps}
        showOverlay={showOverlay}
        showHandle={showHandle}
        contentProps={{
          ...(preserveMounted ? { forceMount: true } : null),
          'aria-modal': true,
        }}
      >
        {children}
      </DynamicDrawer>
    );
  }

  return (
    <DynamicDialog
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      content={content}
      footer={footer}
      overlayProps={overlayProps}
      headerProps={headerProps}
      titleProps={titleProps}
      descriptionProps={descriptionProps}
      footerProps={footerProps}
      showContentCloseButton={showContentCloseButton}
      showFooterCloseButton={showFooterCloseButton}
      contentProps={{
        ...(preserveMounted ? { forceMount: true } : null),
        ...(dialogClassName ? { className: dialogClassName } : null),
        'aria-modal': true,
      }}
    >
      {children}
    </DynamicDialog>
  );
};
