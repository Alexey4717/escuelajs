import type { Metadata } from 'next';

import { pagesPath } from '@/shared/config/routes/$path';
import { buildPageMetadata } from '@/shared/lib/seo';

import { CartRoute } from '@/routes/cart';

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: 'Cart',
    description: 'Products selected for checkout.',
    path: pagesPath.cart.$url().pathname,
    noIndex: true,
  }),
};

export default function CartPage() {
  return <CartRoute />;
}
