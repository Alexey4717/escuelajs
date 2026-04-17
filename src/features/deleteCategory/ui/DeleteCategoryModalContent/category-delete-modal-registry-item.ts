import { createElement } from 'react';

import { ModalRegistryItem } from '@/shared/lib/store/slices/modal/types';

import { DeleteCategoryModalContent } from './DeleteCategoryModalContent';
import { DeleteCategoryModalFooter } from './DeleteCategoryModalFooter';

export const categoryDeleteModalRegistryItem: ModalRegistryItem<'categoryDelete'> =
  {
    component: DeleteCategoryModalContent,
    renderFooter: (props) => createElement(DeleteCategoryModalFooter, props),
    resolveProps: (rawProps) => {
      if (!rawProps || typeof rawProps !== 'object') return null;
      const candidate = rawProps as {
        categoryId?: unknown;
        categoryName?: unknown;
      };
      if (
        typeof candidate.categoryId !== 'string' ||
        !candidate.categoryId.trim()
      ) {
        return null;
      }
      if (
        typeof candidate.categoryName !== 'string' ||
        !candidate.categoryName.trim()
      ) {
        return null;
      }
      return {
        categoryId: candidate.categoryId,
        categoryName: candidate.categoryName,
      };
    },
    fallbackContent: 'Failed to load data for this modal.',
    title: 'Delete category',
    description: 'Confirm category removal from the catalog.',
    showContentCloseButton: true,
    showFooterCloseButton: false,
    dialogClassName: 'max-w-xl',
  };
