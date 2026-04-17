'use client';

import { useState } from 'react';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';

import { CategoryDetailsQuery } from '@/shared/api/generated/graphql';
import { Card } from '@/shared/ui/Card/Card';
import {
  createRemoteFileItem,
  type FilesBoxItem,
  isFilesBoxOverLimit,
} from '@/shared/ui/FilesBox';
import { Form } from '@/shared/ui/Form/Form';

import { CATEGORY_IMAGE_FILES_MAX } from '../../lib/constants';
import {
  categoryFormSchema,
  type CategoryFormStateInput,
  type CategoryFormStateOutput,
} from '../../lib/form/schema';
import { useUpdateSubmitHandler } from '../../lib/form/useUpdateSubmitHandler';
import { CategoryManagementFormActions } from './CategoryManagementFormActions';
import { CategoryManagementFormFields } from './CategoryManagementFormFields';

interface CategoryEditFormCardProps {
  category: CategoryDetailsQuery['category'];
}

export function CategoryEditFormCard({ category }: CategoryEditFormCardProps) {
  const {
    handleSubmit: submitCategory,
    loading: submitLoading,
    imagesUploadLoading,
  } = useUpdateSubmitHandler();

  const categoryId = category.id;
  const [imageFiles, setImageFiles] = useState<FilesBoxItem[]>(() =>
    category.image ? [createRemoteFileItem(category.image)] : [],
  );

  const defaultValues: CategoryFormStateInput = {
    name: category.name,
  };

  const methods = useForm<
    CategoryFormStateInput,
    unknown,
    CategoryFormStateOutput
  >({
    resolver: standardSchemaResolver(categoryFormSchema),
    defaultValues,
  });

  const onSubmit = async (values: CategoryFormStateOutput) => {
    const nextFiles = await submitCategory({
      categoryId,
      values,
      imageFiles,
    });
    setImageFiles(nextFiles);
  };

  return (
    <Card title="Edit category" className="max-w-2xl shadow-sm ring-border/60">
      <Form
        methods={methods}
        onSubmit={onSubmit}
        className="space-y-4"
        aria-busy={imagesUploadLoading || submitLoading}
      >
        <CategoryManagementFormFields
          imageFiles={imageFiles}
          onImageFilesChange={setImageFiles}
        />
        <CategoryManagementFormActions
          submitLabel="Save changes"
          submitLoading={submitLoading}
          imagesUploadLoading={imagesUploadLoading}
          submitDisabled={isFilesBoxOverLimit(
            imageFiles,
            CATEGORY_IMAGE_FILES_MAX,
          )}
        />
      </Form>
    </Card>
  );
}
