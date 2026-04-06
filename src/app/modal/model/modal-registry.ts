import type { ComponentType, ReactNode } from 'react';

import type { ModalKey, ModalRegistryMap } from '@/shared/lib/modal/types';

import {
  ProfileDeleteModalContent,
  ProfileDeleteModalFooter,
} from '@/routes/profile/ui/components/ProfileDeleteModalContent';

export type ModalControls = {
  closeModal: () => void;
};

export type ModalComponentProps<K extends ModalKey> = ModalRegistryMap[K] &
  ModalControls;

export type ModalRegistryItem<K extends ModalKey = ModalKey> = {
  component: ComponentType<ModalComponentProps<K>>;
  renderFooter?: (props: ModalComponentProps<K>) => ReactNode;
  resolveProps: (rawProps: unknown) => ModalRegistryMap[K] | null;
  fallbackContent?: ReactNode;
  title?: string;
  description?: string;
  showContentCloseButton?: boolean;
  showFooterCloseButton?: boolean;
  dialogClassName?: string;
};

export const modalRegistry: { [K in ModalKey]: ModalRegistryItem<K> } = {
  profileDelete: {
    component: ProfileDeleteModalContent,
    renderFooter: (props) => ProfileDeleteModalFooter(props),
    resolveProps: (rawProps) => {
      if (!rawProps || typeof rawProps !== 'object') return null;
      const candidate = rawProps as { email?: unknown };
      if (typeof candidate.email !== 'string' || !candidate.email.trim()) {
        return null;
      }
      return { email: candidate.email };
    },
    fallbackContent:
      'Эту модалку открыли по ссылке. Данные еще инициализируются.',
    title: 'Удаление аккаунта',
    description: 'Подтвердите удаление аккаунта.',
    showContentCloseButton: true,
    showFooterCloseButton: true,
    dialogClassName: 'max-w-xl',
  },
};

export function isModalKey(value: string | null): value is ModalKey {
  if (!value) return false;
  return value in modalRegistry;
}
