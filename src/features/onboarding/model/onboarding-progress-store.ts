'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import {
  ONBOARDING_PROGRESS_STORAGE_KEY,
  type OnboardingFlowId,
} from '@/shared/lib/onboarding';

type FlowProgress = {
  /** Уникально пройденные индексы шагов (после step:after). */
  completedStepIndices: number[];
  scenarioComplete: boolean;
  bottomBarDismissed: boolean;
};

const emptyFlow = (): FlowProgress => ({
  completedStepIndices: [],
  scenarioComplete: false,
  bottomBarDismissed: false,
});

const sortUnique = (nums: number[]): number[] =>
  [...new Set(nums)].sort((a, b) => a - b);

const defineFlowKey = (flow: OnboardingFlowId) =>
  flow === 'guest' ? 'guest' : 'admin';

interface OnboardingProgressState {
  guest: FlowProgress;
  admin: FlowProgress;
  hasHydrated: boolean;
  markHydrated: () => void;
  markStepSeen: (flow: OnboardingFlowId, stepIndex: number) => void;
  markScenarioComplete: (flow: OnboardingFlowId) => void;
  dismissBottomBar: (flow: OnboardingFlowId) => void;
  resetFlow: (flow: OnboardingFlowId) => void;
}

export const useOnboardingProgressStore = create<OnboardingProgressState>()(
  persist(
    (set, get) => ({
      guest: emptyFlow(),
      admin: emptyFlow(),
      hasHydrated: false,
      markHydrated: () => set({ hasHydrated: true }),

      markStepSeen: (flow, stepIndex) => {
        const key = defineFlowKey(flow);
        const prev = get()[key];
        const nextIndices = sortUnique([
          ...prev.completedStepIndices,
          stepIndex,
        ]);
        set({
          [key]: { ...prev, completedStepIndices: nextIndices },
        });
      },

      markScenarioComplete: (flow) => {
        const key = defineFlowKey(flow);
        set({
          [key]: { ...get()[key], scenarioComplete: true },
        });
      },

      dismissBottomBar: (flow) => {
        const key = defineFlowKey(flow);
        set({
          [key]: { ...get()[key], bottomBarDismissed: true },
        });
      },

      resetFlow: (flow) => {
        const key = defineFlowKey(flow);
        set({ [key]: emptyFlow() });
      },
    }),
    {
      name: ONBOARDING_PROGRESS_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        guest: state.guest,
        admin: state.admin,
      }),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    },
  ),
);

export const progressPercentForFlow = (
  flow: OnboardingFlowId,
  totalSteps: number,
): number => {
  const { completedStepIndices } =
    useOnboardingProgressStore.getState()[defineFlowKey(flow)];
  if (totalSteps <= 0) {
    return 0;
  }
  return Math.min(
    100,
    Math.round((completedStepIndices.length / totalSteps) * 100),
  );
};
