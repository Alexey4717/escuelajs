'use client';

import { useState } from 'react';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';

import { ProductDetailsQuery } from '@/shared/api/generated/graphql';
import { Card } from '@/shared/ui/Card/Card';
import {
  createRemoteFileItem,
  type FilesBoxItem,
  isFilesBoxOverLimit,
} from '@/shared/ui/FilesBox';
import { Form } from '@/shared/ui/Form/Form';

import { PRODUCT_IMAGES_MAX_FILES } from '../../lib/constants';
import {
  productFormSchema,
  type ProductFormStateInput,
  type ProductFormStateOutput,
} from '../../lib/form/schema';
import { useUpdateSubmitHandler } from '../../lib/form/useUpdateSubmitHandler';
import { ProductManagementFormActions } from './ProductManagementFormActions';
import { ProductManagementFormFields } from './ProductManagementFormFields';

interface ProductEditFormCardProps {
  product: ProductDetailsQuery['product'];
}

export function ProductEditFormCard({ product }: ProductEditFormCardProps) {
  const {
    handleSubmit: submitProduct,
    loading: submitLoading,
    imagesUploadLoading,
  } = useUpdateSubmitHandler();

  const productId = product.id;
  const [imageFiles, setImageFiles] = useState<FilesBoxItem[]>(() =>
    product.images
      .slice(0, PRODUCT_IMAGES_MAX_FILES)
      .map((url) => createRemoteFileItem(url)),
  );

  const defaultValues: ProductFormStateInput = {
    title: product.title,
    price: String(product.price),
    description: product.description,
    categoryId: String(product.category.id),
  };

  const methods = useForm<
    ProductFormStateInput,
    unknown,
    ProductFormStateOutput
  >({
    resolver: standardSchemaResolver(productFormSchema),
    defaultValues,
  });

  const onSubmit = async (values: ProductFormStateOutput) => {
    const nextFiles = await submitProduct({
      productId,
      values,
      imageFiles,
    });
    setImageFiles(nextFiles);
  };

  return (
    <Card
      title="Редактирование товара"
      className="max-w-2xl shadow-sm ring-border/60"
    >
      <Form
        methods={methods}
        onSubmit={onSubmit}
        className="space-y-4"
        aria-busy={imagesUploadLoading || submitLoading}
      >
        <ProductManagementFormFields
          imageFiles={imageFiles}
          onImageFilesChange={setImageFiles}
        />
        <ProductManagementFormActions
          submitLabel="Сохранить изменения"
          submitLoading={submitLoading}
          imagesUploadLoading={imagesUploadLoading}
          submitDisabled={isFilesBoxOverLimit(
            imageFiles,
            PRODUCT_IMAGES_MAX_FILES,
          )}
        />
      </Form>
    </Card>
  );
}
