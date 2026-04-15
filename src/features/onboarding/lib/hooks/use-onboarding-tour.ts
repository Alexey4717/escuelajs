'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useApolloClient } from '@apollo/client/react';
import {
  ACTIONS,
  type EventData,
  EVENTS,
  STATUS,
  useJoyride,
} from 'react-joyride';

import { type OnboardingFlowId } from '@/shared/lib/onboarding';
import { useAppStore } from '@/shared/lib/store';

import { buildAdminOnboardingSteps } from '../../model/build-admin-steps';
import { buildGuestOnboardingSteps } from '../../model/build-guest-steps';
import { useOnboardingProgressStore } from '../../model/onboarding-progress-store';
import { useOnboardingSessionStore } from '../../model/onboarding-session-store';
import {
  applyOnboardingAdminPreset,
  applyOnboardingGuestPreset,
  resetOnboardingApolloDemo,
} from '../apply-onboarding-preset';
import {
  enterOnboardingCartIsolation,
  exitOnboardingCartIsolation,
} from '../onboarding-cart-bridge';

const mapPickupSelectedEvent = 'onboarding:map-pickup-selected';

export type UseOnboardingTourResult = {
  Tour: import('react').ReactElement | null;
  run: boolean;
  startTour: (flow: OnboardingFlowId, fromStepIndex?: number) => void;
  stopTour: (advance?: boolean) => void;
  isDemoActive: boolean;
  activeFlow: OnboardingFlowId | null;
};

export function useOnboardingTour(): UseOnboardingTourResult {
  const client = useApolloClient();
  const router = useRouter();
  const activeFlowRef = useRef<OnboardingFlowId | null>(null);

  const [run, setRun] = useState(false);
  const [activeFlow, setActiveFlow] = useState<OnboardingFlowId | null>(null);

  const markStepSeen = useOnboardingProgressStore((s) => s.markStepSeen);
  const markScenarioComplete = useOnboardingProgressStore(
    (s) => s.markScenarioComplete,
  );
  const startDemoSession = useOnboardingSessionStore((s) => s.startDemoSession);
  const setCurrentStepIndex = useOnboardingSessionStore(
    (s) => s.setCurrentStepIndex,
  );
  const stopDemoSession = useOnboardingSessionStore((s) => s.stopDemoSession);
  const currentStepIndex = useOnboardingSessionStore((s) => s.currentStepIndex);

  const navigate = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router],
  );
  const openMapModal = useCallback(() => {
    useAppStore.getState().openModal('pickupPointMap', {
      onSelectPickupPoint: () => {
        window.dispatchEvent(new Event(mapPickupSelectedEvent));
      },
    });
  }, []);

  const steps = useMemo(() => {
    if (!activeFlow) {
      return [];
    }
    const getPathname = () =>
      typeof window !== 'undefined' ? window.location.pathname : '';

    return activeFlow === 'guest'
      ? buildGuestOnboardingSteps({
          client,
          navigate,
          getPathname,
          openMapModal,
        })
      : buildAdminOnboardingSteps({
          client,
          navigate,
          getPathname,
        });
  }, [activeFlow, client, navigate, openMapModal]);

  const finalizeTourEnd = useCallback(() => {
    setRun(false);
    setActiveFlow(null);
    activeFlowRef.current = null;
    stopDemoSession();
    useAppStore.getState().closeModal();
    exitOnboardingCartIsolation();
    const pathname =
      typeof window !== 'undefined' ? window.location.pathname : '';
    if (pathname.includes('/products/onboarding-demo-product-')) {
      router.replace('/products');
    }
    resetOnboardingApolloDemo(client);
  }, [client, router, stopDemoSession]);

  const onEvent = useCallback(
    (data: EventData) => {
      const flow = activeFlowRef.current;
      if (data.type === EVENTS.STEP_AFTER && flow != null) {
        markStepSeen(flow, data.index);
        setCurrentStepIndex(data.index + 1);
      }
      if (data.type === EVENTS.TOUR_END) {
        if (
          flow != null &&
          data.status === STATUS.FINISHED &&
          data.action !== ACTIONS.SKIP &&
          data.action !== ACTIONS.CLOSE
        ) {
          markScenarioComplete(flow);
        }
        finalizeTourEnd();
      }
    },
    [finalizeTourEnd, markScenarioComplete, markStepSeen, setCurrentStepIndex],
  );

  const { Tour, controls } = useJoyride({
    run: run && steps.length > 0,
    steps,
    continuous: true,
    scrollToFirstStep: true,
    options: {
      overlayClickAction: false,
      closeButtonAction: 'skip',
      skipBeacon: true,
      buttons: ['back', 'close'],
      zIndex: 10050,
      showProgress: true,
      targetWaitTimeout: 4000,
    },
    onEvent,
  });

  const startTour = useCallback(
    (flow: OnboardingFlowId, fromStepIndex = 0) => {
      enterOnboardingCartIsolation();
      if (flow === 'guest') {
        applyOnboardingGuestPreset(client, fromStepIndex);
      } else {
        applyOnboardingAdminPreset(client, fromStepIndex);
      }
      activeFlowRef.current = flow;
      setActiveFlow(flow);
      setRun(true);
      startDemoSession(flow, fromStepIndex);
      requestAnimationFrame(() => {
        controls.start(fromStepIndex);
      });
    },
    [client, controls, startDemoSession],
  );

  const stopTour = useCallback(
    (advance = false) => {
      controls.stop(advance);
    },
    [controls],
  );

  useEffect(() => {
    const handleMapPickupSelected = () => {
      if (!run || activeFlow !== 'guest' || currentStepIndex !== 7) {
        return;
      }
      controls.next(null);
    };
    window.addEventListener(mapPickupSelectedEvent, handleMapPickupSelected);
    return () => {
      window.removeEventListener(
        mapPickupSelectedEvent,
        handleMapPickupSelected,
      );
    };
  }, [activeFlow, controls, currentStepIndex, run]);

  useEffect(() => {
    if (!run || activeFlow == null) {
      return;
    }
    const step = steps[currentStepIndex];
    if (!step || typeof step.target !== 'string') {
      return;
    }
    const autoAdvanceGuestSteps = new Set([0, 1, 2, 3, 4, 5, 6, 8]);
    const autoAdvanceAdminSteps = new Set([0, 1]);
    const shouldAutoAdvance =
      (activeFlow === 'guest' && autoAdvanceGuestSteps.has(currentStepIndex)) ||
      (activeFlow === 'admin' && autoAdvanceAdminSteps.has(currentStepIndex));
    if (!shouldAutoAdvance) {
      return;
    }

    const selector = step.target;
    const handlePointerDown = (e: Event) => {
      const target = e.target;
      if (!(target instanceof Element)) {
        return;
      }
      if (!target.closest(selector)) {
        return;
      }
      window.setTimeout(() => {
        controls.next();
      }, 120);
    };

    document.addEventListener('pointerdown', handlePointerDown, true);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown, true);
    };
  }, [activeFlow, controls, currentStepIndex, run, steps]);

  return {
    Tour,
    run,
    startTour,
    stopTour,
    isDemoActive: run && activeFlow !== null,
    activeFlow,
  };
}
