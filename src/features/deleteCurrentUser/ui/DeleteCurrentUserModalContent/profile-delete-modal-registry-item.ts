import type { ModalRegistryItem } from '@/app/modal/model/modal-registry';

import { DeleteCurrentUserModalContent } from './DeleteCurrentUserModalContent';
import { DeleteCurrentUserModalFooter } from './DeleteCurrentUserModalFooter';

export const profileDeleteModalRegistryItem: ModalRegistryItem<'profileDelete'> =
  {
    component: DeleteCurrentUserModalContent,
    renderFooter: (props) => DeleteCurrentUserModalFooter(props),
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
    fallbackContent:
      'Эту модалку открыли по ссылке. Данные еще инициализируются.',
    title: 'Удаление аккаунта',
    description: 'Подтвердите удаление аккаунта.',
    showContentCloseButton: true,
    showFooterCloseButton: false,
    dialogClassName: 'max-w-xl',
  };
