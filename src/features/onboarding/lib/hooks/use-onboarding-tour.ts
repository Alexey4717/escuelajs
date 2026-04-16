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
import { OnboardingJoyrideTooltip } from '../../ui/OnboardingJoyrideTooltip';
import {
  applyOnboardingAdminPreset,
  applyOnboardingGuestPreset,
  resetOnboardingApolloDemo,
} from '../apply-onboarding-preset';
import {
  enterOnboardingCartIsolation,
  exitOnboardingCartIsolation,
} from '../onboarding-cart-bridge';
import { onboardingEventBus } from '../onboarding-event-bus';
import { getOnboardingStepData } from '../onboarding-step-behavior';

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
        onboardingEventBus.emit('mapPickupSelected');
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
    const flow = activeFlowRef.current;
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
    resetOnboardingApolloDemo(client, flow);
  }, [client, router, stopDemoSession]);

  const onEvent = useCallback(
    (data: EventData) => {
      const flow = activeFlowRef.current;
      if (data.type === EVENTS.STEP_AFTER && flow != null) {
        markStepSeen(flow, data.index);
        const nextStepIndex =
          data.action === ACTIONS.PREV ? data.index - 1 : data.index + 1;
        setCurrentStepIndex(Math.max(0, nextStepIndex));
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
    tooltipComponent: OnboardingJoyrideTooltip,
    locale: {
      back: 'Back',
      close: 'Close',
      last: 'Last',
      next: 'Next',
    },
    options: {
      arrowColor: 'hsl(var(--popover))',
      backgroundColor: 'hsl(var(--popover))',
      overlayClickAction: false,
      closeButtonAction: 'skip',
      dismissKeyAction: false,
      skipBeacon: true,
      buttons: ['back', 'close', 'primary'],
      zIndex: 10050,
      showProgress: true,
      targetWaitTimeout: 15000,
    },
    styles: {
      arrow: {
        color: 'hsl(var(--popover))',
      },
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
    const unsubscribe = onboardingEventBus.on('mapPickupSelected', () => {
      if (!run || activeFlow !== 'guest') {
        return;
      }

      const currentStep = steps[currentStepIndex];
      if (currentStep == null) {
        return;
      }

      const advanceMode = getOnboardingStepData(currentStep)?.advanceMode;
      if (advanceMode !== 'mapEvent') {
        return;
      }

      controls.next(null);
    });
    return unsubscribe;
  }, [activeFlow, controls, currentStepIndex, run, steps]);

  useEffect(() => {
    if (!run || activeFlow == null) {
      return;
    }

    const handleEscToExitTour = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      controls.skip('button_close');
    };

    window.addEventListener('keydown', handleEscToExitTour, true);
    return () => {
      window.removeEventListener('keydown', handleEscToExitTour, true);
    };
  }, [activeFlow, controls, run]);

  useEffect(() => {
    if (!run || activeFlow == null) {
      return;
    }
    const step = steps[currentStepIndex];
    if (!step || typeof step.target !== 'string') {
      return;
    }
    const advanceMode = getOnboardingStepData(step)?.advanceMode;
    if (advanceMode !== 'targetClick') {
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
