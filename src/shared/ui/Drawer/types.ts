import type { ComponentProps, ReactNode } from 'react';

import { Drawer as DrawerPrimitive } from 'vaul';

export type DrawerRootProps = ComponentProps<typeof DrawerPrimitive.Root>;
export type DrawerTriggerProps = ComponentProps<typeof DrawerPrimitive.Trigger>;
export type DrawerPortalProps = ComponentProps<typeof DrawerPrimitive.Portal>;
export type DrawerCloseProps = ComponentProps<typeof DrawerPrimitive.Close>;
export type DrawerOverlayProps = ComponentProps<typeof DrawerPrimitive.Overlay>;
export type DrawerContentProps = ComponentProps<typeof DrawerPrimitive.Content>;
export type DrawerTitleProps = ComponentProps<typeof DrawerPrimitive.Title>;
export type DrawerDescriptionProps = ComponentProps<
  typeof DrawerPrimitive.Description
>;

export type DrawerHeaderProps = ComponentProps<'div'>;
export type DrawerFooterProps = ComponentProps<'div'>;

export type DrawerProps = DrawerRootProps & {
  /** Готовый trigger-элемент (например, `<DrawerTrigger asChild>...`) */
  trigger?: ReactNode;
  triggerProps?: Omit<DrawerTriggerProps, 'children'>;
  /** Заголовок в секции `DrawerHeader` при авто-сборке */
  title?: ReactNode;
  /** Описание под заголовком при авто-сборке */
  description?: ReactNode;
  /** Основной контент в авто-сборке */
  content?: ReactNode;
  /** Контент футера при авто-сборке */
  footer?: ReactNode;
  /** Настройка вложенных частей в упрощенном API */
  overlayProps?: DrawerOverlayProps;
  contentProps?: Omit<
    DrawerContentComponentProps,
    'children' | 'overlayProps' | 'showOverlay' | 'showHandle'
  >;
  headerProps?: DrawerHeaderProps;
  titleProps?: Omit<DrawerTitleProps, 'children'>;
  descriptionProps?: Omit<DrawerDescriptionProps, 'children'>;
  footerProps?: Omit<DrawerFooterProps, 'children'>;
  showOverlay?: boolean;
  showHandle?: boolean;
};

export type DrawerContentComponentProps = DrawerContentProps & {
  /** Пропсы для оверлея внутри content */
  overlayProps?: DrawerOverlayProps;
  /** Показывать оверлей */
  showOverlay?: boolean;
  /** Показывать "ручку" сверху */
  showHandle?: boolean;
};
