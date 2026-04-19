'use client';

import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
} from 'react';

import { ONBOARDING_PROGRESS_STORAGE_KEY } from '@/shared/lib/onboarding';

import {
  useOnboardingTour,
  type UseOnboardingTourResult,
} from '../lib/hooks/use-onboarding-tour';
import { useOnboardingProgressStore } from './onboarding-progress-store';

const OnboardingTourContext = createContext<UseOnboardingTourResult | null>(
  null,
);

export const OnboardingTourProvider = ({ children }: PropsWithChildren) => {
  const tour = useOnboardingTour();

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== ONBOARDING_PROGRESS_STORAGE_KEY || e.newValue == null) {
        return;
      }
      void useOnboardingProgressStore.persist.rehydrate();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <OnboardingTourContext.Provider value={tour}>
      {children}
      {tour.Tour}
    </OnboardingTourContext.Provider>
  );
};

export const useOnboardingTourContext = (): UseOnboardingTourResult => {
  const ctx = useContext(OnboardingTourContext);
  if (!ctx) {
    throw new Error(
      'useOnboardingTourContext must be used inside OnboardingTourProvider',
    );
  }
  return ctx;
};

export const useOnboardingTourOptional = (): UseOnboardingTourResult | null =>
  useContext(OnboardingTourContext);
