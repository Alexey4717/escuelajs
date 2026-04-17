import { input, object, output, string } from 'zod/v4';

export const productFormSchema = object({
  title: string()
    .min(1, 'Enter product title')
    .meta({
      formField: {
        label: 'Title',
        'data-testid': 'productForm__input__title',
      },
    }),
  price: string()
    .min(1, 'Enter price')
    .refine((value) => Number(value) > 0, 'Price must be greater than 0')
    .meta({
      formField: {
        label: 'Price',
        'data-testid': 'productForm__input__price',
      },
    }),
  description: string()
    .min(1, 'Enter description')
    .meta({
      formField: {
        label: 'Description',
        'data-testid': 'productForm__input__description',
      },
    }),
  categoryId: string()
    .min(1, 'Select category')
    .refine(
      (value) => Number.isInteger(Number(value)) && Number(value) > 0,
      'Specify a valid category',
    )
    .meta({
      // для категорий опции приходят из API
      // в `ProductManagementCategoryField` и передаются в props
      formField: {
        label: 'Category',
        placeholder: 'Select category…',
        'data-testid': 'productForm__input__categoryId',
      },
    }),
});

export const productFormDefaultValues: ProductFormStateInput = {
  title: '',
  price: '',
  description: '',
  categoryId: '',
};

export type ProductFormStateOutput = output<typeof productFormSchema>;
export type ProductFormStateInput = input<typeof productFormSchema>;
