'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { DeleteProductDocument } from '@/shared/api/generated/graphql';
import { pagesPath } from '@/shared/config/routes/$path';
import { revalidateTagsAction } from '@/shared/lib/cache/nextjs/revalidate-tags.action';
import { nextCacheTags } from '@/shared/lib/cache/nextjs/tags';

type DeleteProductArgs = {
  productId: string;
  closeModal: () => void;
};

export function useDeleteProductSubmitHandler() {
  const router = useRouter();
  const [deleteProduct, { loading }] = useMutation(DeleteProductDocument);

  const submitDelete = async ({ productId, closeModal }: DeleteProductArgs) => {
    try {
      const { data } = await deleteProduct({
        variables: { id: productId },
      });

      if (!data?.deleteProduct) {
        throw new Error('Failed to delete product');
      }

      await revalidateTagsAction({
        tags: [nextCacheTags.products, nextCacheTags.product(productId)],
        paths: [pagesPath.products.$url().path],
      });

      toast.success('Product deleted');
      closeModal();

      router.replace(pagesPath.products.$url().path);
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete product');
    }
  };

  return {
    submitDelete,
    loading,
  };
}
