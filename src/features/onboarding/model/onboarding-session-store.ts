'use client';

import { create } from 'zustand';

import { type OnboardingFlowId } from '@/shared/lib/onboarding';

interface OnboardingSessionState {
  isDemoActive: boolean;
  activeFlow: OnboardingFlowId | null;
  currentStepIndex: number;
  startDemoSession: (flow: OnboardingFlowId, stepIndex: number) => void;
  setCurrentStepIndex: (stepIndex: number) => void;
  stopDemoSession: () => void;
}

export const useOnboardingSessionStore = create<OnboardingSessionState>(
  (set) => ({
    isDemoActive: false,
    activeFlow: null,
    currentStepIndex: 0,

    startDemoSession: (flow, stepIndex) =>
      set({
        isDemoActive: true,
        activeFlow: flow,
        currentStepIndex: Math.max(0, stepIndex),
      }),

    setCurrentStepIndex: (stepIndex) =>
      set((state) =>
        state.isDemoActive
          ? { currentStepIndex: Math.max(0, stepIndex) }
          : state,
      ),

    stopDemoSession: () =>
      set({
        isDemoActive: false,
        activeFlow: null,
        currentStepIndex: 0,
      }),
  }),
);
