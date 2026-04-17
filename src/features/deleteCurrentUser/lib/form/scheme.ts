import { input, object, output, string } from 'zod/v4';

export const deleteCurrentUserFormSchema = object({
  reason: string().meta({
    formField: {
      label: 'Reason for deletion',
    },
  }),
});

export type DeleteCurrentUserFormStateInput = input<
  typeof deleteCurrentUserFormSchema
>;
export type DeleteCurrentUserFormStateOutput = output<
  typeof deleteCurrentUserFormSchema
>;

export const deleteCurrentUserFormDefaultValues: DeleteCurrentUserFormStateOutput =
  {
    reason: '',
  };
