import { useAppStore } from '@/shared/lib/store';

/** Сбрасывает поля слайсов, чтобы тесты не делили глобальный Zustand. */
export function resetAppStore(): void {
  useAppStore.setState({
    currentUserId: null,
    scrollByPath: {},
    virtuosoGridByPath: {},
    openedModal: null,
    modalPropsByKey: {},
  });
}
