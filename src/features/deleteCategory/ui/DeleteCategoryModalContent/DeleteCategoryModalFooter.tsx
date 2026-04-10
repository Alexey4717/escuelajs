'use client';

import type { ModalRegistryMap } from '@/shared/lib/modal/types';
import { Button } from '@/shared/ui/Button/Button';

import { useDeleteCategorySubmitHandler } from '../../api/use-delete-category-submit-handler';

type DeleteCategoryModalFooterProps = ModalRegistryMap['categoryDelete'] & {
  closeModal: () => void;
};

export function DeleteCategoryModalFooter({
  categoryId,
  closeModal,
}: DeleteCategoryModalFooterProps) {
  const { submitDelete, loading } = useDeleteCategorySubmitHandler();

  const handleDelete = () => {
    void submitDelete({ categoryId, closeModal });
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
      <Button
        type="button"
        variant="secondary"
        onClick={closeModal}
        disabled={loading}
        className="w-full sm:w-auto"
        data-testid="deleteCategory__button__closeModal"
      >
        Отмена
      </Button>
      <Button
        type="button"
        variant="destructive"
        disabled={loading}
        className="w-full sm:w-auto"
        onClick={handleDelete}
        data-testid="deleteCategory__button__deleteCategory"
      >
        Удалить
      </Button>
    </div>
  );
}
