import { Page } from '@/widgets/Page';

import { productCreateHeadingPage } from '../lib/constants';
import { ProductCreateFormCard } from './components/ProductCreateFormCard';

export const ProductCreateRoute = () => (
  <Page narrow heading={productCreateHeadingPage}>
    <ProductCreateFormCard />
  </Page>
);
