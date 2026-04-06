import type { ReactNode } from 'react';

import type {
  DialogDescriptionProps,
  DialogFooterProps,
  DialogHeaderProps,
  DialogOverlayProps,
  DialogRootProps,
  DialogTitleProps,
} from '@/shared/ui/Dialog/types';
import type {
  DrawerDescriptionProps,
  DrawerFooterProps,
  DrawerHeaderProps,
  DrawerOverlayProps,
  DrawerRootProps,
  DrawerTitleProps,
} from '@/shared/ui/Drawer/types';

type ModalRootProps = Pick<
  DialogRootProps & DrawerRootProps,
  'open' | 'defaultOpen' | 'onOpenChange'
>;

export type ModalProps = ModalRootProps & {
  children?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;
  overlayProps?: DialogOverlayProps | DrawerOverlayProps;
  headerProps?: DialogHeaderProps | DrawerHeaderProps;
  titleProps?: Omit<DialogTitleProps & DrawerTitleProps, 'children'>;
  descriptionProps?: Omit<
    DialogDescriptionProps & DrawerDescriptionProps,
    'children'
  >;
  footerProps?: Omit<DialogFooterProps & DrawerFooterProps, 'children'>;
  showOverlay?: boolean;
  showHandle?: boolean;
  showContentCloseButton?: boolean;
  showFooterCloseButton?: boolean;
  dialogClassName?: string;
  isMobile?: boolean;
  preserveMounted?: boolean;
};
