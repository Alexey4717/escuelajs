import { input, object, output, string } from 'zod/v4';

export const productFormSchema = object({
  title: string()
    .min(1, 'Введите название товара')
    .meta({
      formField: {
        label: 'Название',
        'data-testid': 'productForm__input__title',
      },
    }),
  price: string()
    .min(1, 'Введите цену')
    .refine((value) => Number(value) > 0, 'Цена должна быть больше 0')
    .meta({
      formField: {
        label: 'Цена',
        'data-testid': 'productForm__input__price',
      },
    }),
  description: string()
    .min(1, 'Введите описание')
    .meta({
      formField: {
        label: 'Описание',
        'data-testid': 'productForm__input__description',
      },
    }),
  categoryId: string()
    .min(1, 'Введите id категории')
    .refine(
      (value) => Number.isInteger(Number(value)) && Number(value) > 0,
      'Укажите корректный id категории',
    )
    .meta({
      formField: {
        label: 'ID категории',
        'data-testid': 'productForm__input__categoryId',
      },
    }),
  image: string()
    .min(1, 'Введите URL изображения')
    .meta({
      formField: {
        label: 'URL изображения',
        'data-testid': 'productForm__input__image',
      },
    }),
});

export const productFormDefaultValues: ProductFormStateInput = {
  title: '',
  price: '',
  description: '',
  categoryId: '',
  image: '',
};

export type ProductFormStateOutput = output<typeof productFormSchema>;
export type ProductFormStateInput = input<typeof productFormSchema>;
