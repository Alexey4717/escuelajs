'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card/Card';
import { Form } from '@/shared/ui/Form/Form';

import {
  categoryFormDefaultValues,
  categoryFormSchema,
  type CategoryFormStateInput,
  type CategoryFormStateOutput,
} from '../../lib/form/schema';
import { useCreateSubmitHandler } from '../../lib/form/useCreateSubmitHandler';
import { CategoryManagementFormActions } from './CategoryManagementFormActions';
import { CategoryManagementFormFields } from './CategoryManagementFormFields';

export function CategoryCreateFormCard() {
  const { handleSubmit: submitCategory, loading: submitLoading } =
    useCreateSubmitHandler();

  const methods = useForm<
    CategoryFormStateInput,
    unknown,
    CategoryFormStateOutput
  >({
    resolver: standardSchemaResolver(categoryFormSchema),
    defaultValues: categoryFormDefaultValues,
  });

  const onSubmit = async (values: CategoryFormStateOutput) => {
    await submitCategory({ values });
  };

  return (
    <Card
      title="Новая категория"
      className="max-w-2xl shadow-sm ring-border/60"
    >
      <Form methods={methods} onSubmit={onSubmit} className="space-y-4">
        <CategoryManagementFormFields />
        <CategoryManagementFormActions
          submitLabel="Создать категорию"
          submitLoading={submitLoading}
        />
      </Form>
    </Card>
  );
}
