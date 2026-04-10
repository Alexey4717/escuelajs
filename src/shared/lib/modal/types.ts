import type { ComponentType, ReactNode } from 'react';

export interface ModalRegistryMap {
  profileDelete: {
    email: string;
    userId: string;
  };
  productDelete: {
    productId: string;
    productTitle: string;
  };
  categoryDelete: {
    categoryId: string;
    categoryName: string;
  };
}

export type ModalKey = Extract<keyof ModalRegistryMap, string>;

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
