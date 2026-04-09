'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';

import { Card } from '@/shared/ui/Card/Card';
import { Form } from '@/shared/ui/Form/Form';

import {
  productFormDefaultValues,
  productFormSchema,
  type ProductFormStateInput,
  type ProductFormStateOutput,
} from '../../lib/form/schema';
import { useCreateSubmitHandler } from '../../lib/form/useCreateSubmitHandler';
import { ProductManagementFormActions } from './ProductManagementFormActions';
import { ProductManagementFormFields } from './ProductManagementFormFields';

export function ProductCreateFormCard() {
  const { handleSubmit: submitProduct, loading: submitLoading } =
    useCreateSubmitHandler();

  const methods = useForm<
    ProductFormStateInput,
    unknown,
    ProductFormStateOutput
  >({
    resolver: standardSchemaResolver(productFormSchema),
    defaultValues: productFormDefaultValues,
  });

  const onSubmit = async (values: ProductFormStateOutput) => {
    await submitProduct({ values });
  };

  return (
    <Card title="Новый товар" className="max-w-2xl shadow-sm ring-border/60">
      <Form methods={methods} onSubmit={onSubmit} className="space-y-4">
        <ProductManagementFormFields />
        <ProductManagementFormActions
          submitLabel="Создать товар"
          submitLoading={submitLoading}
        />
      </Form>
    </Card>
  );
}
