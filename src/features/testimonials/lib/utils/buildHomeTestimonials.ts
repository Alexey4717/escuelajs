import type { HomeLandingQuery } from '@/shared/api/generated/graphql';

import { HomeTestimonial } from '../types';

type UserRow = HomeLandingQuery['users'][number];
type ProductRow = HomeLandingQuery['products'][number];

const REVIEW_BLUEPRINTS: Array<{ quote: string; subtitle: string }> = [
  {
    quote:
      'Заказала куртку и наушники — доставка быстрая, в каталоге всё понятно по размерам и характеристикам.',
    subtitle: 'Покупательница, раздел «Одежда»',
  },
  {
    quote:
      'Удобно сравнивать цены по категориям. Корзина в другом сервисе, а здесь отлично смотреть ассортимент.',
    subtitle: 'Покупатель, электроника',
  },
  {
    quote:
      'Интерфейс спокойный, без лишнего шума. Нашёл нужный товар через фильтр по категории за пару кликов.',
    subtitle: 'Клиент Escuela.io',
  },
  {
    quote:
      'Регистрация заняла минуту. Профиль удобный — вижу заказы и могу сменить пароль без танцев.',
    subtitle: 'Зарегистрированный пользователь',
  },
  {
    quote:
      'Беру здесь подарки коллегам: и футболки, и гаджеты. Качество фото товаров на высоте.',
    subtitle: 'HR, корпоративные закупки',
  },
  {
    quote:
      'Как админу нравится, что роли разделены: каталог для всех, управление — только с правами.',
    subtitle: 'Администратор витрины',
  },
  {
    quote:
      'Для семьи заказываем и одежду, и технику в одном месте. Экономит время на поиске.',
    subtitle: 'Семейный покупатель',
  },
  {
    quote:
      'Страница товара с каруселью фото — супер. Не гадаешь, что именно приедет.',
    subtitle: 'Постоянный клиент',
  },
];

function withProductHint(
  quote: string,
  product: ProductRow | undefined,
): string {
  if (!product?.title) {
    return quote;
  }
  return `${quote} Особенно зашёл товар «${product.title}».`;
}

function fallbackTestimonials(): HomeTestimonial[] {
  return REVIEW_BLUEPRINTS.slice(0, 6).map((b, i) => ({
    id: `demo-${i}`,
    name:
      [
        'Анна К.',
        'Михаил С.',
        'Елена В.',
        'Дмитрий П.',
        'Ольга М.',
        'Игорь Т.',
      ][i] ?? `Гость ${i + 1}`,
    subtitle: b.subtitle,
    quote: b.quote,
    avatarUrl: null,
  }));
}

export function buildHomeTestimonials(
  users: UserRow[],
  products: ProductRow[],
): HomeTestimonial[] {
  if (!users.length) {
    return fallbackTestimonials();
  }

  return users.map((user, i) => {
    const blueprint = REVIEW_BLUEPRINTS[i % REVIEW_BLUEPRINTS.length]!;
    const product =
      products.length > 0 ? products[i % products.length] : undefined;
    const roleLower = user.role?.toLowerCase() ?? '';
    const roleLabel =
      roleLower === 'admin' || roleLower === 'administrator'
        ? 'Администратор'
        : 'Покупатель';
    return {
      id: user.id,
      name: user.name,
      subtitle: `${roleLabel} · Escuela.io`,
      quote: withProductHint(blueprint.quote, product),
      avatarUrl: user.avatar?.trim() ? user.avatar : null,
    };
  });
}
