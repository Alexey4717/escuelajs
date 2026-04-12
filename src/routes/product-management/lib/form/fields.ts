import {
  createRHFCombobox,
  createRHFTextareaField,
  createRHFTextField,
} from '@/shared/lib/form';

import { productFormSchema } from './schema';

export const ProductTitleField = createRHFTextField(productFormSchema, 'title');
export const ProductPriceField = createRHFTextField(productFormSchema, 'price');
export const ProductDescriptionField = createRHFTextareaField(
  productFormSchema,
  'description',
);
export const ProductCategoryIdField = createRHFCombobox(
  productFormSchema,
  'categoryId',
);
export const ProductImageField = createRHFTextField(productFormSchema, 'image');
