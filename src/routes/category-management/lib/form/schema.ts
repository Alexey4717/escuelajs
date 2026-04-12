import { input, object, output, string } from 'zod/v4';

export const categoryFormSchema = object({
  name: string()
    .min(1, 'Введите название категории')
    .meta({
      formField: {
        label: 'Название',
        'data-testid': 'categoryForm__input__name',
      },
    }),
});

export const categoryFormDefaultValues: CategoryFormStateInput = {
  name: '',
};

export type CategoryFormStateInput = input<typeof categoryFormSchema>;
export type CategoryFormStateOutput = output<typeof categoryFormSchema>;
