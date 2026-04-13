import type { Metadata } from 'next';

import { CartRoute } from '@/routes/cart';

export const metadata: Metadata = {
  title: 'Корзина',
};

export default function CartPage() {
  return <CartRoute />;
}
