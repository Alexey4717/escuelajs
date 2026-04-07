import type { ComponentProps, ReactNode } from 'react';

import type { VariantProps } from 'class-variance-authority';

import type { alertVariants } from './constants';

export type AlertRootProps = ComponentProps<'div'> &
  VariantProps<typeof alertVariants>;

export type AlertTitleProps = ComponentProps<'div'>;

export type AlertDescriptionProps = ComponentProps<'div'>;

export type AlertActionProps = ComponentProps<'div'>;

export type AlertProps = AlertRootProps & {
  /** Иконка слева (обычно `lucide-react` компонент) */
  icon?: ReactNode;
  /** Контент заголовка, если не переданы `children` */
  title?: ReactNode;
  /** Контент описания, если не переданы `children` */
  description?: ReactNode;
  /** Действие справа сверху, если не переданы `children` */
  action?: ReactNode;
  /** Доп. пропсы для `AlertTitle` в декларативном режиме */
  titleProps?: AlertTitleProps;
  /** Доп. пропсы для `AlertDescription` в декларативном режиме */
  descriptionProps?: AlertDescriptionProps;
  /** Доп. пропсы для `AlertAction` в декларативном режиме */
  actionProps?: AlertActionProps;
};
