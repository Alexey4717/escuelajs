'use client';

import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';

import { ProductDetailsQuery } from '@/shared/api/generated/graphql';
import { Card } from '@/shared/ui/Card/Card';
import { Form } from '@/shared/ui/Form/Form';

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
  const { handleSubmit: submitProduct, loading: submitLoading } =
    useUpdateSubmitHandler();

  const productId = product.id;
  const defaultValues: ProductFormStateInput = {
    title: product.title,
    price: String(product.price),
    description: product.description,
    categoryId: String(product.category.id),
    image: product.images[0] ?? '',
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
    await submitProduct({
      productId,
      values,
    });
  };

  return (
    <Card
      title="Редактирование товара"
      className="max-w-2xl shadow-sm ring-border/60"
    >
      <Form methods={methods} onSubmit={onSubmit} className="space-y-4">
        <ProductManagementFormFields />
        <ProductManagementFormActions
          submitLabel="Сохранить изменения"
          submitLoading={submitLoading}
        />
      </Form>
    </Card>
  );
}
