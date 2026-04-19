'use client';

import { useState } from 'react';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card/Card';
import { type FilesBoxItem, isFilesBoxOverLimit } from '@/shared/ui/FilesBox';
import { Form } from '@/shared/ui/Form/Form';

import { PRODUCT_IMAGES_MAX_FILES } from '../../lib/constants';
import {
  productFormDefaultValues,
  productFormSchema,
  type ProductFormStateInput,
  type ProductFormStateOutput,
} from '../../lib/form/schema';
import { useCreateSubmitHandler } from '../../lib/form/useCreateSubmitHandler';
import { useOnboardingProductCreateAutofill } from '../../lib/hooks/useOnboardingProductCreateAutofill';
import { ProductManagementFormActions } from './ProductManagementFormActions';
import { ProductManagementFormFields } from './ProductManagementFormFields';

export const ProductCreateFormCard = () => {
  const {
    handleSubmit: submitProduct,
    loading: submitLoading,
    imagesUploadLoading,
  } = useCreateSubmitHandler();
  const [imageFiles, setImageFiles] = useState<FilesBoxItem[]>([]);

  const methods = useForm<
    ProductFormStateInput,
    unknown,
    ProductFormStateOutput
  >({
    resolver: standardSchemaResolver(productFormSchema),
    defaultValues: productFormDefaultValues,
  });

  useOnboardingProductCreateAutofill({ methods, setImageFiles });

  const onSubmit = async (values: ProductFormStateOutput) => {
    const nextFiles = await submitProduct({ values, imageFiles });
    setImageFiles(nextFiles);
  };

  return (
    <Card title="New product" className="max-w-2xl shadow-sm ring-border/60">
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
          submitLabel="Create product"
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
};
