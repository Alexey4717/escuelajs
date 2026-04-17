import { input, object, output, string } from 'zod/v4';

export const categoryFormSchema = object({
  name: string()
    .min(1, 'Enter category name')
    .meta({
      formField: {
        label: 'Title',
        'data-testid': 'categoryForm__input__name',
      },
    }),
});

export const categoryFormDefaultValues: CategoryFormStateInput = {
  name: '',
};

export type CategoryFormStateInput = input<typeof categoryFormSchema>;
export type CategoryFormStateOutput = output<typeof categoryFormSchema>;
