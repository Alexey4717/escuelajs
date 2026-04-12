import { Page } from '@/widgets/Page';

import { categoryCreateHeadingPage } from '../lib/constants';
import { CategoryCreateFormCard } from './components/CategoryCreateFormCard';

export function CategoryCreateRoute() {
  return (
    <Page narrow heading={categoryCreateHeadingPage}>
      <CategoryCreateFormCard />
    </Page>
  );
}
