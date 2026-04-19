'use client';

import type { ModalRegistryMap } from '@/shared/lib/store/slices/modal/types';
import { Button } from '@/shared/ui/Button/Button';

import { useDeleteProductSubmitHandler } from '../../api/use-delete-product-submit-handler';

type DeleteProductModalFooterProps = ModalRegistryMap['productDelete'] & {
  closeModal: () => void;
};
export const DeleteProductModalFooter = ({
  productId,
  closeModal,
}: DeleteProductModalFooterProps) => {
  const { submitDelete, loading } = useDeleteProductSubmitHandler();

  const handleDeleteProduct = () => {
    void submitDelete({ productId, closeModal });
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
      <Button
        type="button"
        variant="secondary"
        onClick={closeModal}
        disabled={loading}
        className="w-full sm:w-auto"
        data-testid="deleteProduct__button__closeModal"
      >
        Cancel
      </Button>
      <Button
        type="button"
        variant="destructive"
        loading={loading}
        className="w-full sm:w-auto"
        onClick={handleDeleteProduct}
        data-testid="deleteProduct__button__deleteProduct"
      >
        {loading ? 'Deleting' : 'Delete'}
      </Button>
    </div>
  );
};
