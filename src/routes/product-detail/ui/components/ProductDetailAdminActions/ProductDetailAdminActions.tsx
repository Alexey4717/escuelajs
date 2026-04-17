'use client';

import Link from 'next/link';

import { pagesPath } from '@/shared/config/routes/$path';
import { ONBOARDING_TARGET_IDS } from '@/shared/lib/onboarding';
import { Button } from '@/shared/ui/Button/Button';

import { useCurrentUserRole } from '@/entities/Session';

import { useDeleteProductModal } from '@/features/deleteProduct';
import {
  ONBOARDING_ADMIN_DEMO_PRODUCT_A_ID,
  useOnboardingSessionStore,
} from '@/features/onboarding';

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
  const isOnboardingFinalStep = useOnboardingSessionStore(
    (s) =>
      s.isDemoActive &&
      s.activeFlow === 'admin' &&
      s.currentStepIndex === 9 &&
      productId === ONBOARDING_ADMIN_DEMO_PRODUCT_A_ID,
  );

  const handleOpenDeleteProductModal = () => {
    open({ productId, productTitle });
  };

  if (loading || role !== 'admin') {
    return null;
  }

  return (
    <div
      className="flex flex-wrap gap-2"
      data-onboarding={ONBOARDING_TARGET_IDS.productDetailAdminActions}
    >
      <Button
        variant="outline"
        size="sm"
        asChild={!isOnboardingFinalStep}
        disabled={isOnboardingFinalStep}
        data-testid="productDetail__link__editProduct"
      >
        {isOnboardingFinalStep ? (
          <span>Edit</span>
        ) : (
          <Link href={pagesPath.products._id(productId).edit.$url().path}>
            Edit
          </Link>
        )}
      </Button>
      <Button
        type="button"
        variant="destructive"
        size="sm"
        aria-haspopup="dialog"
        onClick={
          isOnboardingFinalStep ? undefined : handleOpenDeleteProductModal
        }
        disabled={isOnboardingFinalStep}
        data-testid="productDetail__button__openDeleteProductModal"
      >
        Delete
      </Button>
    </div>
  );
}
