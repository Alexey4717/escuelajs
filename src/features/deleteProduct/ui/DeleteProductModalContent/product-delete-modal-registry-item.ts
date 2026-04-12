import { createElement } from 'react';

import { ModalRegistryItem } from '@/shared/lib/store/slices/modal/types';

import { DeleteProductModalContent } from './DeleteProductModalContent';
import { DeleteProductModalFooter } from './DeleteProductModalFooter';

export const productDeleteModalRegistryItem: ModalRegistryItem<'productDelete'> =
  {
    component: DeleteProductModalContent,
    renderFooter: (props) => createElement(DeleteProductModalFooter, props),
    resolveProps: (rawProps) => {
      if (!rawProps || typeof rawProps !== 'object') return null;
      const candidate = rawProps as {
        productId?: unknown;
        productTitle?: unknown;
      };
      if (
        typeof candidate.productId !== 'string' ||
        !candidate.productId.trim()
      ) {
        return null;
      }
      if (
        typeof candidate.productTitle !== 'string' ||
        !candidate.productTitle.trim()
      ) {
        return null;
      }
      return {
        productId: candidate.productId,
        productTitle: candidate.productTitle,
      };
    },
    fallbackContent: 'Не удалось загрузить данные для этой модалки.',
    title: 'Удаление товара',
    description: 'Подтвердите удаление товара из каталога.',
    showContentCloseButton: true,
    showFooterCloseButton: false,
    dialogClassName: 'max-w-xl',
  };
