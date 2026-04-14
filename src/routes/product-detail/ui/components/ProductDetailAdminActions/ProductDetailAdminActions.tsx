'use client';

import Link from 'next/link';

import { pagesPath } from '@/shared/config/routes/$path';
import { Button } from '@/shared/ui/Button/Button';

import { useCurrentUserRole } from '@/entities/Session';

import { useDeleteProductModal } from '@/features/deleteProduct';

interface ProductDetailAdminActionsProps {
  productId: string;
  productTitle: string;
}

export function ProductDetailAdminActions({
  productId,
  productTitle,
}: ProductDetailAdminActionsProps) {
  const { role, loading } = useCurrentUserRole();
  const { open } = useDeleteProductModal();

  const handleOpenDeleteProductModal = () => {
    open({ productId, productTitle });
  };

  if (loading || role !== 'admin') {
    return null;
  }

  return (
    <>
      <Button
        asChild
        variant="outline"
        size="sm"
        data-testid="productDetail__link__editProduct"
      >
        <Link href={pagesPath.products._id(productId).edit.$url().path}>
          Редактировать
        </Link>
      </Button>
      <Button
        type="button"
        variant="destructive"
        size="sm"
        onClick={handleOpenDeleteProductModal}
        data-testid="productDetail__button__openDeleteProductModal"
      >
        Удалить
      </Button>
    </>
  );
}
