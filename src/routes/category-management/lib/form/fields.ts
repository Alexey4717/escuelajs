import { createRHFTextField } from '@/shared/lib/form';

import { categoryFormSchema } from './schema';

export const CategoryNameField = createRHFTextField(categoryFormSchema, 'name');
