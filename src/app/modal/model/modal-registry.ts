import type {
  ModalKey,
  ModalRegistryItem,
} from '@/shared/lib/store/slices/modal/types';

import { categoryDeleteModalRegistryItem } from '@/features/deleteCategory';
import { profileDeleteModalRegistryItem } from '@/features/deleteCurrentUser';
import { productDeleteModalRegistryItem } from '@/features/deleteProduct';
import { pickupPointMapModalRegistryItem } from '@/features/pickupPointMap';

export const modalRegistry: { [K in ModalKey]: ModalRegistryItem<K> } = {
  pickupPointMap: pickupPointMapModalRegistryItem,
  profileDelete: profileDeleteModalRegistryItem,
  productDelete: productDeleteModalRegistryItem,
  categoryDelete: categoryDeleteModalRegistryItem,
};

export function isModalKey(value: string | null): value is ModalKey {
  if (!value) return false;
  return value in modalRegistry;
}
