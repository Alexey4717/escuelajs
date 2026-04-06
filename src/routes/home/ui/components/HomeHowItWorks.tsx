import Link from 'next/link';

import { CreditCard, ShoppingBag, UserPlus } from 'lucide-react';

import { cn } from '@/shared/lib/styles/cn';
import { pagesPath } from '@/shared/routes/$path';
import { Typography } from '@/shared/ui/Typography/Typography';

const STEPS = [
  {
    n: '01',
    title: 'Зарегистрируйтесь',
    description:
      'Создайте аккаунт на странице регистрации — понадобится email и пароль. После входа откроется профиль и персональные возможности.',
    href: pagesPath.register.$url().path,
    icon: UserPlus,
    cta: 'Регистрация',
  },
  {
    n: '02',
    title: 'Выберите товар',
    description:
      'Откройте каталог или категории, сравните цены и фото. Карточка товара покажет описание и характеристики перед решением.',
    href: pagesPath.products.$url().path,
    icon: ShoppingBag,
    cta: 'В каталог',
  },
  {
    n: '03',
    title: 'Оплатите заказ',
    description:
      'Оформление оплаты в этом демо не подключено: в реальном магазине здесь был бы выбор способа оплаты и подтверждение заказа.',
    href: pagesPath.products.$url().path,
    icon: CreditCard,
    cta: 'К товарам',
  },
] as const;

export function HomeHowItWorks() {
  return (
    <section aria-labelledby="home-how-heading" className="space-y-10">
      <Typography id="home-how-heading" variant="h2">
        Как это работает
      </Typography>

      <ul className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {STEPS.map((step) => (
          <li key={step.n} className="relative min-w-0">
            <span
              className={cn(
                'absolute -top-3 left-4 z-10 inline-flex items-center justify-center rounded-md border border-border bg-background px-2 py-1 font-mono text-[11px] font-semibold tabular-nums text-muted-foreground shadow-sm',
              )}
              aria-hidden
            >
              {step.n}
            </span>
            <div
              className={cn(
                'relative overflow-hidden rounded-3xl border border-border bg-muted/40 pt-8 shadow-sm dark:bg-muted/25',
                'aspect-[5/4] max-h-52 bg-[radial-gradient(circle,oklch(55%_0_0deg/0.12)_1px,transparent_1px)] [background-size:14px_14px] dark:bg-[radial-gradient(circle,oklch(100%_0_0deg/0.08)_1px,transparent_1px)]',
              )}
            >
              <div className="flex h-full items-center justify-center pb-6">
                <step.icon
                  className="size-14 text-foreground/35 stroke-[1.25] dark:text-foreground/40"
                  aria-hidden
                />
              </div>
            </div>
            <step.icon
              className="mt-5 size-5 text-muted-foreground"
              aria-hidden
            />
            <Typography variant="h3" className="mt-2 text-lg font-semibold">
              {step.title}
            </Typography>
            <Typography
              variant="body2"
              className="mt-2 text-pretty text-muted-foreground"
            >
              {step.description}
            </Typography>
            <Link
              href={step.href}
              className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {step.cta}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
