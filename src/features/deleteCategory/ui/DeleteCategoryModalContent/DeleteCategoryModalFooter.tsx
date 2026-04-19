'use client';

import type { ModalRegistryMap } from '@/shared/lib/store/slices/modal/types';
import { Button } from '@/shared/ui/Button/Button';

import { useDeleteCategoryProductsGuard } from '../../api/use-delete-category-products-guard';
import { useDeleteCategorySubmitHandler } from '../../api/use-delete-category-submit-handler';

type DeleteCategoryModalFooterProps = ModalRegistryMap['categoryDelete'] & {
  closeModal: () => void;
};
export const DeleteCategoryModalFooter = ({
  categoryId,
  closeModal,
}: DeleteCategoryModalFooterProps) => {
  const {
    loading: guardLoading,
    error: guardError,
    hasProducts,
  } = useDeleteCategoryProductsGuard(categoryId);
  const { submitDelete, loading: deleteLoading } =
    useDeleteCategorySubmitHandler();

  const handleDelete = () => {
    void submitDelete({ categoryId, closeModal });
  };

  const showDeleteButton = !guardLoading && !guardError && !hasProducts;

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
      <Button
        type="button"
        variant="secondary"
        onClick={closeModal}
        disabled={deleteLoading}
        className="w-full sm:w-auto"
        data-testid="deleteCategory__button__closeModal"
      >
        Cancel
      </Button>
      {showDeleteButton ? (
        <Button
          type="button"
          variant="destructive"
          loading={deleteLoading}
          className="w-full sm:w-auto"
          onClick={handleDelete}
          data-testid="deleteCategory__button__deleteCategory"
        >
          {deleteLoading ? 'Deleting' : 'Delete'}
        </Button>
      ) : null}
    </div>
  );
};
