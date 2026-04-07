import type { ComponentType, ReactNode } from 'react';

import type { ModalKey, ModalRegistryMap } from '@/shared/lib/modal/types';

import { profileDeleteModalRegistryItem } from '@/features/deleteCurrentUser';

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
  profileDelete: profileDeleteModalRegistryItem,
};

export function isModalKey(value: string | null): value is ModalKey {
  if (!value) return false;
  return value in modalRegistry;
}
