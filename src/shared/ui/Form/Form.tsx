import { type FormHTMLAttributes, type ReactNode } from 'react';

import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  type UseFormReturn,
} from 'react-hook-form';

interface FormProps<TForm extends FieldValues> extends Omit<
  FormHTMLAttributes<HTMLFormElement>,
  'onSubmit' | 'children'
> {
  children: ReactNode;
  methods: UseFormReturn<TForm>;
  onSubmit: SubmitHandler<TForm>;
  resetOnSubmit?: boolean;
}

export const Form = <TForm extends FieldValues>({
  children,
  methods,
  onSubmit,
  resetOnSubmit = false,
  ...nativeFormProps
}: FormProps<TForm>) => {
  const handleSubmit = async (data: TForm) => {
    try {
      await onSubmit(data);
      if (resetOnSubmit) {
        methods.reset();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        {...nativeFormProps}
        onSubmit={methods.handleSubmit(handleSubmit)}
        noValidate // Отключаем встроенную валидацию браузера
      >
        {children}
      </form>
    </FormProvider>
  );
};
