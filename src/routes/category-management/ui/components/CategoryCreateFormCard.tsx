'use client';

import { useState } from 'react';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card/Card';
import { type FilesBoxItem, isFilesBoxOverLimit } from '@/shared/ui/FilesBox';
import { Form } from '@/shared/ui/Form/Form';

import { CATEGORY_IMAGE_FILES_MAX } from '../../lib/constants';
import {
  categoryFormDefaultValues,
  categoryFormSchema,
  type CategoryFormStateInput,
  type CategoryFormStateOutput,
} from '../../lib/form/schema';
import { useCreateSubmitHandler } from '../../lib/form/useCreateSubmitHandler';
import { useOnboardingCategoryCreateAutofill } from '../../lib/hooks/useOnboardingCategoryCreateAutofill';
import { CategoryManagementFormActions } from './CategoryManagementFormActions';
import { CategoryManagementFormFields } from './CategoryManagementFormFields';

export function CategoryCreateFormCard() {
  const {
    handleSubmit: submitCategory,
    loading: submitLoading,
    imagesUploadLoading,
  } = useCreateSubmitHandler();
  const [imageFiles, setImageFiles] = useState<FilesBoxItem[]>([]);

  const methods = useForm<
    CategoryFormStateInput,
    unknown,
    CategoryFormStateOutput
  >({
    resolver: standardSchemaResolver(categoryFormSchema),
    defaultValues: categoryFormDefaultValues,
  });

  const onSubmit = async (values: CategoryFormStateOutput) => {
    const nextFiles = await submitCategory({ values, imageFiles });
    setImageFiles(nextFiles);
  };

  useOnboardingCategoryCreateAutofill({
    methods,
    setImageFiles,
  });

  return (
    <Card
      title="Новая категория"
      className="max-w-2xl shadow-sm ring-border/60"
    >
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
          submitLabel="Создать категорию"
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
