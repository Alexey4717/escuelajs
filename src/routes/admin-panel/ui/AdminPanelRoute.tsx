import { ONBOARDING_TARGET_IDS } from '@/shared/lib/onboarding';

import { Page } from '@/widgets/Page';

import {
  addEntitiesButtonsConfig,
  adminPanelHeadingPage,
} from '../lib/constants';
import { AddEntityButtonLink } from './components/AddEntityButtonLink';

export const AdminPanelRoute = () => {
  return (
    <Page narrow heading={adminPanelHeadingPage}>
      <div
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        data-onboarding={ONBOARDING_TARGET_IDS.adminPanelGrid}
      >
        {addEntitiesButtonsConfig.map((item) => (
          <AddEntityButtonLink
            key={item.href}
            href={item.href}
            onboardingTarget={item.onboardingTarget}
          >
            {item.title}
          </AddEntityButtonLink>
        ))}
      </div>
    </Page>
  );
};
