import { Page } from '@/widgets/Page';

import {
  addEntitiesButtonsConfig,
  adminPanelHeadingPage,
} from '../lib/constants';
import { AddEntityButtonLink } from './components/AddEntityButtonLink';

export const AdminPanelRoute = () => {
  return (
    <Page narrow heading={adminPanelHeadingPage}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addEntitiesButtonsConfig.map((item) => (
          <AddEntityButtonLink key={item.href} href={item.href}>
            {item.title}
          </AddEntityButtonLink>
        ))}
      </div>
    </Page>
  );
};
