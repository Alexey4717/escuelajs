'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card/Card';
import { Form } from '@/shared/ui/Form/Form';

import { Page } from '@/widgets/Page';

import {
  categoryFormDefaultValues,
  categoryFormSchema,
  CategoryFormStateInput,
  CategoryFormStateOutput,
} from '../lib/form/schema';
import { useCreateSubmitHandler } from '../lib/form/useCreateSubmitHandler';
import { CategoryManagementFormActions } from './components/CategoryManagementFormActions';
import { CategoryManagementFormFields } from './components/CategoryManagementFormFields';

export function CategoryCreateRoute() {
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
    <Page narrow heading="Создание категории">
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
    </Page>
  );
}
