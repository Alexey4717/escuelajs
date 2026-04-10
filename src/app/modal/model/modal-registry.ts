import type { ModalKey, ModalRegistryItem } from '@/shared/lib/modal/types';

import { profileDeleteModalRegistryItem } from '@/features/deleteCurrentUser';
import { productDeleteModalRegistryItem } from '@/features/deleteProduct';

export const modalRegistry: { [K in ModalKey]: ModalRegistryItem<K> } = {
  profileDelete: profileDeleteModalRegistryItem,
  productDelete: productDeleteModalRegistryItem,
};

export function isModalKey(value: string | null): value is ModalKey {
  if (!value) return false;
  return value in modalRegistry;
}
