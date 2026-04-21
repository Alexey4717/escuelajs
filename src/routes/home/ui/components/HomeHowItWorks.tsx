import Link from 'next/link';

import { CreditCard, ShoppingBag, UserPlus } from 'lucide-react';

import { pagesPath } from '@/shared/config/routes/$path';
import { cn } from '@/shared/lib/styles/cn';
import { PageSection } from '@/shared/ui/PageSection/PageSection';
import { PageSectionBody } from '@/shared/ui/PageSection/PageSectionBody';
import { PageSectionHeader } from '@/shared/ui/PageSection/PageSectionHeader';
import { Typography } from '@/shared/ui/Typography/Typography';

const STEPS = [
  {
    n: '01',
    title: 'Create an account',
    description:
      'Sign up on the registration page using your email and password. After login, your profile and personalized features become available.',
    href: pagesPath.register.$url().path,
    icon: UserPlus,
    cta: 'Sign up',
  },
  {
    n: '02',
    title: 'Pick a product',
    description:
      'Open the shared catalog or browse by category — compare prices, images, and details before you add anything to the cart.',
    href: pagesPath.products.$url().path,
    icon: ShoppingBag,
    cta: 'Browse catalog',
  },
  {
    n: '03',
    title: 'Complete checkout',
    description:
      'Go to the Cart page, review your line items, and submit the checkout form (contact details and pickup or delivery info). This learning project does not charge a real card — you get a demo confirmation only.',
    href: pagesPath.cart.$url().path,
    icon: CreditCard,
    cta: 'Open cart',
  },
] as const;

export const HomeHowItWorks = () => (
  <PageSection aria-labelledby="home-how-heading">
    <PageSectionHeader titleId="home-how-heading" title="How it works" />

    <PageSectionBody>
      <ul className="mx-auto flex w-full max-w-5xl flex-col flex-wrap items-stretch justify-center gap-10 md:flex-row md:gap-8">
        {STEPS.map((step) => (
          <li
            key={step.n}
            className="relative min-w-0 flex-1 basis-full text-center md:basis-0"
          >
            <span
              className={cn(
                'absolute -top-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center justify-center rounded-md border border-border bg-background px-2 py-1 font-mono text-[11px] font-semibold tabular-nums text-muted-foreground shadow-sm',
              )}
              aria-hidden
            >
              {step.n}
            </span>
            <div
              className={cn(
                'relative mx-auto max-w-md overflow-hidden rounded-3xl border border-border bg-muted/40 pt-8 shadow-sm dark:bg-muted/25 md:max-w-none',
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
              className="mx-auto mt-5 size-5 text-muted-foreground"
              aria-hidden
            />
            <Typography
              variant="h3"
              className="mt-2 text-lg font-semibold text-balance"
            >
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
    </PageSectionBody>
  </PageSection>
);
