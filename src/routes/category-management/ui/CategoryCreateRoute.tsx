import { Page } from '@/widgets/Page';

import { categoryCreateHeadingPage } from '../lib/constants';
import { CategoryCreateFormCard } from './components/CategoryCreateFormCard';

export const CategoryCreateRoute = () => (
  <Page narrow heading={categoryCreateHeadingPage}>
    <CategoryCreateFormCard />
  </Page>
);
