import { type ApolloClient } from '@apollo/client';
import { type Step } from 'react-joyride';

import { pagesPath } from '@/shared/config/routes/$path';
import {
  ONBOARDING_TARGET_IDS,
  onboardingSelector,
} from '@/shared/lib/onboarding';

import { applyOnboardingGuestPreset } from '../lib/apply-onboarding-preset';
import { ONBOARDING_DEMO_PRODUCT_B_ID } from '../lib/onboarding-demo-fixtures';
import { onboardingEventBus } from '../lib/onboarding-event-bus';
import { type OnboardingStepAdvanceMode } from '../lib/onboarding-step-behavior';
import { delay } from '../lib/utils/delay';

type BuildGuestStepsParams = {
  client: ApolloClient;
  navigate: (path: string) => void;
  getPathname: () => string;
  openMapModal: () => void;
};

async function waitForTarget(
  selector: string,
  timeoutMs = 15000,
): Promise<void> {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (document.querySelector(selector)) {
      return;
    }
    await delay(100);
  }
}

const GUEST_TARGETS = [
  onboardingSelector(ONBOARDING_TARGET_IDS.sidebarNavProducts),
  onboardingSelector(ONBOARDING_TARGET_IDS.catalogFilters),
  onboardingSelector(ONBOARDING_TARGET_IDS.catalogFirstProductCart),
  onboardingSelector(ONBOARDING_TARGET_IDS.catalogSecondProductLink),
  onboardingSelector(ONBOARDING_TARGET_IDS.productDetailCart),
  onboardingSelector(ONBOARDING_TARGET_IDS.topbarCart),
  onboardingSelector(ONBOARDING_TARGET_IDS.cartPickOnMapButton),
  `.${ONBOARDING_TARGET_IDS.mapDemoPickupPoint}`,
  onboardingSelector(ONBOARDING_TARGET_IDS.cartPlaceOrderButton),
  onboardingSelector(ONBOARDING_TARGET_IDS.homeContactForm),
] as const;

/**
 * Создаёт шаги гостевого сценария. `before` — пресет и маршрут перед показом шага.
 */
export function buildGuestOnboardingSteps({
  client,
  navigate,
  getPathname,
  openMapModal,
}: BuildGuestStepsParams): Step[] {
  const productsPath = pagesPath.products.$url().path;
  const cartPath = pagesPath.cart.$url().path;
  const homePath = pagesPath.$url().path;
  const productBPath = pagesPath.products
    ._id(ONBOARDING_DEMO_PRODUCT_B_ID)
    .$url().path;

  const routeTargets: Array<{ pathname: string | null }> = [
    { pathname: null },
    { pathname: productsPath },
    { pathname: productsPath },
    { pathname: productsPath },
    { pathname: productBPath },
    { pathname: null },
    { pathname: cartPath },
    { pathname: cartPath },
    { pathname: cartPath },
    { pathname: homePath },
  ];
  const advanceModes: OnboardingStepAdvanceMode[] = [
    'targetClick',
    'tooltipNext',
    'targetClick',
    'targetClick',
    'targetClick',
    'targetClick',
    'targetClick',
    'mapEvent',
    'targetClick',
    'tooltipLast',
  ];

  const total = GUEST_TARGETS.length;

  return GUEST_TARGETS.map((target, stepIndex) => {
    const m = routeTargets[stepIndex];
    return {
      target,
      title: `Step ${stepIndex + 1} of ${total}`,
      content: <GuestStepContent index={stepIndex} />,
      placement: 'bottom' as const,
      disableBeacon: true,
      showBeacon: false,
      data: {
        advanceMode: advanceModes[stepIndex],
      },
      blockTargetInteraction: stepIndex === 1 || stepIndex === 9,
      before: async () => {
        applyOnboardingGuestPreset(client, stepIndex);
        const targetPath = m.pathname;
        if (targetPath && getPathname() !== targetPath) {
          navigate(targetPath);
          await delay(700);
        }
        if (stepIndex === 0 && typeof window !== 'undefined') {
          onboardingEventBus.emit('openMobileSidebar');
        }
        if (stepIndex === 6 && typeof window !== 'undefined') {
          await waitForTarget(
            onboardingSelector(ONBOARDING_TARGET_IDS.cartCheckout),
          );
          onboardingEventBus.emit('clearPickupAddress');
          onboardingEventBus.emit('openMobileCheckout');
          await delay(120);
          onboardingEventBus.emit('openMobileCheckout');
        }
        if (stepIndex === 8 && typeof window !== 'undefined') {
          onboardingEventBus.emit('openMobileCheckout');
          await delay(120);
          onboardingEventBus.emit('openMobileCheckout');
        }
        if (stepIndex === 7) {
          openMapModal();
          await waitForTarget(`.${ONBOARDING_TARGET_IDS.mapDemoPickupPoint}`);
        }
        await waitForTarget(target);
      },
    };
  });
}

function GuestStepContent({ index }: { index: number }) {
  const bodies: string[] = [
    'Open the “Products” item in the sidebar.',
    'Use catalog filters to narrow the product list. Filter fields are auto-filled for demo mode.',
    'Add the first demo product (A) to cart from the list.',
    'Open the second demo product (B) by clicking its card.',
    'On the product page, add demo product B to cart.',
    'Open the cart using the top bar icon.',
    'Click “Choose on map” in checkout to open pickup points map.',
    'Select the highlighted demo pickup point on the map.',
    'The form is prefilled with demo data. Click “Place order”.',
    'Need help? You can use the contact form at the bottom of the home page.',
  ];

  return <p className="text-sm leading-relaxed">{bodies[index] ?? ''}</p>;
}
