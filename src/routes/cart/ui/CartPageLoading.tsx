import { Spinner } from '@/shared/ui/Spinner/Spinner';

import { Page } from '@/widgets/Page';

import { CART_PAGE_HEADING } from '../lib/constants';

export const CartPageLoading = () => (
  <Page heading={CART_PAGE_HEADING} narrow>
    <div
      className="flex min-h-[200px] items-center justify-center"
      aria-busy
      aria-live="polite"
    >
      <Spinner className="size-8 text-muted-foreground" />
    </div>
  </Page>
);
