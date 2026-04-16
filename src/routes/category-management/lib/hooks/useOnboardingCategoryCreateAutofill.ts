import { type Dispatch, type SetStateAction, useEffect, useRef } from 'react';

import type { UseFormReturn } from 'react-hook-form';

import { createRemoteFileItem, type FilesBoxItem } from '@/shared/ui/FilesBox';

import {
  ONBOARDING_ADMIN_DEMO_CATEGORY_FORM,
  useOnboardingSessionStore,
} from '@/features/onboarding';

import type {
  CategoryFormStateInput,
  CategoryFormStateOutput,
} from '../form/schema';

interface UseOnboardingCategoryCreateAutofillParams {
  methods: UseFormReturn<
    CategoryFormStateInput,
    unknown,
    CategoryFormStateOutput
  >;
  setImageFiles: Dispatch<SetStateAction<FilesBoxItem[]>>;
}

export function useOnboardingCategoryCreateAutofill({
  methods,
  setImageFiles,
}: UseOnboardingCategoryCreateAutofillParams) {
  const didAutofillRef = useRef(false);
  const currentStepIndex = useOnboardingSessionStore((s) => s.currentStepIndex);
  const isAdminOnboardingDemo = useOnboardingSessionStore(
    (s) => s.isDemoActive && s.activeFlow === 'admin',
  );

  useEffect(() => {
    if (
      !isAdminOnboardingDemo ||
      currentStepIndex !== 4 ||
      didAutofillRef.current
    ) {
      return;
    }

    methods.reset({
      name: ONBOARDING_ADMIN_DEMO_CATEGORY_FORM.name,
    });
    didAutofillRef.current = true;

    const timerId = window.setTimeout(() => {
      setImageFiles([
        createRemoteFileItem(ONBOARDING_ADMIN_DEMO_CATEGORY_FORM.image),
      ]);
    }, 0);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [currentStepIndex, isAdminOnboardingDemo, methods, setImageFiles]);
}
