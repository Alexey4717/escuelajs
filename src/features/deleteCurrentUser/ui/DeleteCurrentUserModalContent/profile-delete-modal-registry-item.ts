import { createElement } from 'react';

import { ModalRegistryItem } from '@/shared/lib/store/slices/modal/types';

import { DeleteCurrentUserModalContent } from './DeleteCurrentUserModalContent';
import { DeleteCurrentUserModalFooter } from './DeleteCurrentUserModalFooter';

export const profileDeleteModalRegistryItem: ModalRegistryItem<'profileDelete'> =
  {
    component: DeleteCurrentUserModalContent,
    renderFooter: (props) => createElement(DeleteCurrentUserModalFooter, props),
    resolveProps: (rawProps) => {
      if (!rawProps || typeof rawProps !== 'object') return null;
      const candidate = rawProps as { email?: unknown; userId?: unknown };
      if (typeof candidate.email !== 'string' || !candidate.email.trim()) {
        return null;
      }
      if (typeof candidate.userId !== 'string' || !candidate.userId.trim()) {
        return null;
      }
      return { email: candidate.email, userId: candidate.userId };
    },
    fallbackContent: 'Не удалось загрузить данные для этой модалки.',
    title: 'Удаление аккаунта',
    description: 'Подтвердите удаление аккаунта.',
    showContentCloseButton: true,
    showFooterCloseButton: false,
    dialogClassName: 'max-w-xl',
  };
