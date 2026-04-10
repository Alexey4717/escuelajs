'use client';

import { useRouter } from 'next/navigation';

import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';

import { DeleteProductDocument } from '@/shared/api/generated/graphql';
import { revalidateTagsAction } from '@/shared/lib/cache/nextjs/revalidate-tags.action';
import { nextCacheTags } from '@/shared/lib/next-cache-tags/tags';
import { pagesPath } from '@/shared/routes/$path';

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
        throw new Error('Не удалось удалить товар');
      }

      await revalidateTagsAction({
        tags: [nextCacheTags.products, nextCacheTags.product(productId)],
        paths: [pagesPath.products.$url().path],
      });

      toast.success('Товар удалён');
      closeModal();

      router.replace(pagesPath.products.$url().path);
    } catch (err) {
      console.error(err);
      toast.error('Не удалось удалить товар');
    }
  };

  return {
    submitDelete,
    loading,
  };
}
