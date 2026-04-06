import type { ComponentProps, ReactNode } from 'react';

import { Dialog as DialogPrimitive } from 'radix-ui';

export type DialogRootProps = ComponentProps<typeof DialogPrimitive.Root>;

export type DialogTriggerProps = ComponentProps<typeof DialogPrimitive.Trigger>;

export type DialogPortalProps = ComponentProps<typeof DialogPrimitive.Portal>;

export type DialogCloseProps = ComponentProps<typeof DialogPrimitive.Close>;

export type DialogOverlayProps = ComponentProps<typeof DialogPrimitive.Overlay>;

export type DialogContentProps = ComponentProps<
  typeof DialogPrimitive.Content
> & {
  showCloseButton?: boolean;
  overlayProps?: DialogOverlayProps;
};

export type DialogHeaderProps = ComponentProps<'div'>;

export type DialogFooterProps = ComponentProps<'div'> & {
  showCloseButton?: boolean;
};

export type DialogTitleProps = ComponentProps<typeof DialogPrimitive.Title>;

export type DialogDescriptionProps = ComponentProps<
  typeof DialogPrimitive.Description
>;

export type DialogProps = DialogRootProps & {
  /**
   * Кастомный триггер. Если передан, рендерится как дочерний элемент `DialogTrigger`.
   * Если нужен полный контроль разметки, используйте `children`.
   */
  trigger?: ReactNode;
  triggerProps?: Omit<DialogTriggerProps, 'children'>;

  /** Упрощенный API; игнорируется, если передан `children` */
  title?: ReactNode;
  description?: ReactNode;
  content?: ReactNode;
  footer?: ReactNode;

  /** Настройка вложенных частей в упрощенном API */
  overlayProps?: DialogOverlayProps;
  contentProps?: Omit<DialogContentProps, 'children' | 'overlayProps'>;
  headerProps?: DialogHeaderProps;
  titleProps?: Omit<DialogTitleProps, 'children'>;
  descriptionProps?: Omit<DialogDescriptionProps, 'children'>;
  footerProps?: Omit<DialogFooterProps, 'children'>;
  showContentCloseButton?: boolean;
  showFooterCloseButton?: boolean;
};
