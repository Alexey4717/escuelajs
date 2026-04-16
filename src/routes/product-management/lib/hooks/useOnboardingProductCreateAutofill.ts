import { type Dispatch, type SetStateAction, useEffect, useRef } from 'react';

import type { UseFormReturn } from 'react-hook-form';

import { createRemoteFileItem, type FilesBoxItem } from '@/shared/ui/FilesBox';

import {
  ONBOARDING_ADMIN_DEMO_PRODUCT_FORM,
  useOnboardingSessionStore,
} from '@/features/onboarding';

import type {
  ProductFormStateInput,
  ProductFormStateOutput,
} from '../form/schema';

interface UseOnboardingProductCreateAutofillParams {
  methods: UseFormReturn<
    ProductFormStateInput,
    unknown,
    ProductFormStateOutput
  >;
  setImageFiles: Dispatch<SetStateAction<FilesBoxItem[]>>;
}

export function useOnboardingProductCreateAutofill({
  methods,
  setImageFiles,
}: UseOnboardingProductCreateAutofillParams) {
  const didAutofillRef = useRef(false);
  const currentStepIndex = useOnboardingSessionStore((s) => s.currentStepIndex);
  const isAdminOnboardingDemo = useOnboardingSessionStore(
    (s) => s.isDemoActive && s.activeFlow === 'admin',
  );

  useEffect(() => {
    if (
      !isAdminOnboardingDemo ||
      currentStepIndex !== 7 ||
      didAutofillRef.current
    ) {
      return;
    }

    methods.reset({
      title: ONBOARDING_ADMIN_DEMO_PRODUCT_FORM.title,
      price: ONBOARDING_ADMIN_DEMO_PRODUCT_FORM.price,
      description: ONBOARDING_ADMIN_DEMO_PRODUCT_FORM.description,
      categoryId: ONBOARDING_ADMIN_DEMO_PRODUCT_FORM.categoryId,
    });
    didAutofillRef.current = true;

    const timerId = window.setTimeout(() => {
      setImageFiles([
        createRemoteFileItem(ONBOARDING_ADMIN_DEMO_PRODUCT_FORM.image),
      ]);
    }, 0);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [currentStepIndex, isAdminOnboardingDemo, methods, setImageFiles]);
}
