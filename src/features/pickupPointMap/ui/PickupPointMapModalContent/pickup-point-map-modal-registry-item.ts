import { ModalRegistryItem } from '@/shared/lib/store/slices/modal/types';

import { PickupPointMapModalContent } from './PickupPointMapModalContent';

export const pickupPointMapModalRegistryItem: ModalRegistryItem<'pickupPointMap'> =
  {
    component: PickupPointMapModalContent,
    resolveProps: (rawProps) => {
      if (!rawProps || typeof rawProps !== 'object') return null;
      const candidate = rawProps as {
        onSelectPickupPoint?: unknown;
      };

      if (typeof candidate.onSelectPickupPoint !== 'function') {
        return null;
      }

      return {
        onSelectPickupPoint: candidate.onSelectPickupPoint as (selection: {
          name: string;
          latitude: number;
          longitude: number;
        }) => void,
      };
    },
    showContentCloseButton: false,
    showFooterCloseButton: false,
    title: 'Выбор пункта выдачи на карте',
    description: 'Выберите точку самовывоза из списка доступных локаций.',
    dialogClassName:
      'top-0 left-0 h-dvh w-screen max-w-none -translate-x-0 -translate-y-0 rounded-none border-0 p-0 sm:max-w-none [&>[data-slot=dialog-header]]:hidden',
    forceDesktop: true,
  };
