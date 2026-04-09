import { Page } from '@/widgets/Page';

import { productCreateHeadingPage } from '../lib/constants';
import { ProductCreateFormCard } from './components/ProductCreateFormCard';

export function ProductCreateRoute() {
  return (
    <Page narrow heading={productCreateHeadingPage}>
      <ProductCreateFormCard />
    </Page>
  );
}
