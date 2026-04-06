'use client';

import { useMemo } from 'react';

import type { ModalKey } from '@/shared/lib/modal/types';
import { useAppStore } from '@/shared/lib/store';
import { Modal } from '@/shared/ui/Modal/Modal';

import { modalRegistry } from '../model/modal-registry';

type ModalHostProps = {
  isMobile: boolean;
};

function getModalRawProps<K extends ModalKey>(
  key: K,
  modalPropsByKey: Record<string, unknown>,
) {
  return modalPropsByKey[key];
}

export function ModalHost({ isMobile }: ModalHostProps) {
  const openedModal = useAppStore((state) => state.openedModal);
  const modalPropsByKey = useAppStore((state) => state.modalPropsByKey);
  const closeModal = useAppStore((state) => state.closeModal);

  const mountedModal = useMemo<ModalKey | null>(
    () =>
      openedModal && openedModal in modalRegistry
        ? (openedModal as ModalKey)
        : null,
    [openedModal],
  );

  const entry = useMemo(
    () => (mountedModal ? modalRegistry[mountedModal] : null),
    [mountedModal],
  );

  const rawProps =
    mountedModal && entry
      ? getModalRawProps(mountedModal, modalPropsByKey)
      : undefined;
  const modalProps = entry?.resolveProps(rawProps) ?? null;

  if (!mountedModal || !entry) return null;

  const fallbackContent = (
    <div className="space-y-3 text-sm">
      <p className="text-muted-foreground">
        {entry.fallbackContent ??
          'Не удалось открыть модалку: отсутствуют обязательные данные.'}
      </p>
      <p className="text-muted-foreground">
        Проверьте ссылку или откройте это действие из интерфейса приложения.
      </p>
    </div>
  );
  const ContentComponent = entry.component;

  return (
    <Modal
      isMobile={isMobile}
      open={openedModal === mountedModal}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          closeModal();
        }
      }}
      title={entry.title}
      description={entry.description}
      showContentCloseButton={entry.showContentCloseButton}
      showFooterCloseButton={modalProps ? entry.showFooterCloseButton : true}
      dialogClassName={entry.dialogClassName}
      footer={
        modalProps
          ? entry.renderFooter?.({ ...modalProps, closeModal })
          : undefined
      }
      content={
        modalProps ? (
          <ContentComponent {...modalProps} closeModal={closeModal} />
        ) : (
          fallbackContent
        )
      }
    />
  );
}
