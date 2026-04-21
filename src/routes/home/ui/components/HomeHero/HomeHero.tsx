import Link from 'next/link';

import { pagesPath } from '@/shared/config/routes/$path';
import { cn } from '@/shared/lib/styles/cn';
import { Button } from '@/shared/ui/Button/Button';
import { Typography } from '@/shared/ui/Typography/Typography';

import styles from './HomeHero.module.scss';

const FLOATING_CARDS = [
  {
    className: 'left-[8%] top-[18%] h-28 w-20 sm:h-36 sm:w-24',
    animationClassName: styles.animateDrift,
    style: { animationDelay: '-2s' } as const,
  },
  {
    className: 'right-[10%] top-[22%] h-24 w-32 sm:h-32 sm:w-40',
    animationClassName: styles.animateFloat,
    style: { animationDelay: '-4s' } as const,
  },
  {
    className: 'left-[18%] bottom-[26%] h-20 w-28 sm:h-28 sm:w-36',
    animationClassName: styles.animateFloat,
    style: { animationDelay: '-1s' } as const,
  },
  {
    className: 'right-[20%] bottom-[20%] h-32 w-24 sm:h-40 sm:w-28',
    animationClassName: styles.animateDrift,
    style: { animationDelay: '-5s' } as const,
  },
  {
    className:
      'left-1/2 top-1/2 h-36 w-28 -translate-x-1/2 -translate-y-1/2 sm:h-44 sm:w-36',
    animationClassName: styles.animateFloat,
    style: { animationDelay: '-3s' } as const,
  },
] as const;

/**
 * LCP на главной чаще всего даёт **крупный текст (h1)** или, на узких экранах,
 * первая карточка товара ниже — см. `prioritizeCoverImage` в `HomeProducts`.
 */
export const HomeHero = () => (
  <section
    aria-label="Main banner"
    className={cn(
      'relative -mx-[var(--spacing-layout)] -mt-[var(--spacing-layout)] mb-12 w-[calc(100%+2*var(--spacing-layout))] max-w-none overflow-hidden rounded-none',
      'border-y border-slate-200/80 dark:border-white/5',
      'min-h-[min(78vh,52rem)]',
      'bg-gradient-to-br from-sky-50 via-white to-slate-100',
      'dark:bg-[oklch(16%_0.06_264deg)] dark:bg-none',
    )}
  >
    <div
      className={cn(
        'pointer-events-none absolute inset-0',
        'bg-[radial-gradient(ellipse_90%_75%_at_50%_42%,oklch(94%_0.05_245deg/0.55)_0%,transparent_62%)]',
        'dark:bg-[radial-gradient(ellipse_85%_70%_at_50%_45%,oklch(28%_0.12_250deg/0.35)_0%,transparent_55%)]',
      )}
      aria-hidden
    />
    <div
      className={cn(
        'pointer-events-none absolute inset-0',
        'bg-[linear-gradient(125deg,oklch(96%_0.04_250deg/0.5)_0%,transparent_50%,oklch(94%_0.03_230deg/0.35)_100%)]',
        'dark:bg-[linear-gradient(120deg,oklch(22%_0.08_264deg/0.4)_0%,transparent_45%,oklch(18%_0.06_220deg/0.35)_100%)]',
      )}
      aria-hidden
    />
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-sky-600/16 dark:hidden"
      aria-hidden
    >
      <defs>
        <pattern
          id="home-hero-grid-light"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M48 0H0V48"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
          />
        </pattern>
        <linearGradient
          id="home-hero-line-light"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor="oklch(58% 0.12 240deg)"
            stopOpacity="0"
          />
          <stop
            offset="50%"
            stopColor="oklch(55% 0.1 248deg)"
            stopOpacity="0.28"
          />
          <stop
            offset="100%"
            stopColor="oklch(50% 0.08 260deg)"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#home-hero-grid-light)" />
      <line
        x1="0"
        y1="65%"
        x2="100%"
        y2="35%"
        stroke="url(#home-hero-line-light)"
        strokeWidth="1"
      />
      <line
        x1="15%"
        y1="100%"
        x2="85%"
        y2="0"
        stroke="url(#home-hero-line-light)"
        strokeWidth="0.7"
        opacity="0.5"
      />
    </svg>
    <svg
      className="pointer-events-none absolute inset-0 hidden h-full w-full text-sky-400/25 dark:block"
      aria-hidden
    >
      <defs>
        <pattern
          id="home-hero-grid-dark"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M48 0H0V48"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.6"
          />
        </pattern>
        <linearGradient
          id="home-hero-line-dark"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor="oklch(72% 0.14 230deg)"
            stopOpacity="0"
          />
          <stop
            offset="45%"
            stopColor="oklch(78% 0.12 240deg)"
            stopOpacity="0.5"
          />
          <stop
            offset="100%"
            stopColor="oklch(65% 0.1 260deg)"
            stopOpacity="0"
          />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#home-hero-grid-dark)" />
      <line
        x1="0"
        y1="65%"
        x2="100%"
        y2="35%"
        stroke="url(#home-hero-line-dark)"
        strokeWidth="1.2"
      />
      <line
        x1="15%"
        y1="100%"
        x2="85%"
        y2="0"
        stroke="url(#home-hero-line-dark)"
        strokeWidth="0.8"
        opacity="0.6"
      />
    </svg>
    <div
      className={cn(
        'pointer-events-none absolute -left-1/4 top-1/4 h-[min(50vw,28rem)] w-[min(50vw,28rem)] rounded-full blur-[100px]',
        'bg-sky-300/35 dark:bg-sky-500/20',
      )}
      aria-hidden
    />
    <div
      className={cn(
        'pointer-events-none absolute -right-1/4 bottom-1/4 h-[min(45vw,24rem)] w-[min(45vw,24rem)] rounded-full blur-[90px]',
        'bg-sky-200/30 dark:bg-indigo-500/15',
      )}
      aria-hidden
    />

    {FLOATING_CARDS.map((card, i) => (
      <div
        key={i}
        className={cn(
          'pointer-events-none absolute rounded-xl backdrop-blur-md',
          'border border-slate-300/45 bg-white/50 shadow-sm shadow-sky-900/5',
          'dark:border-white/15 dark:bg-white/[0.06] dark:shadow-[0_0_40px_oklch(60%_0.12_250deg/0.12)]',
          card.className,
          card.animationClassName,
        )}
        style={card.style}
        aria-hidden
      />
    ))}

    <div
      className={cn(
        'pointer-events-none absolute inset-0',
        'bg-[radial-gradient(ellipse_at_center,transparent_40%,oklch(99%_0.01_250deg/0.5)_100%)]',
        'dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(12%_0.05_264deg/0.2)_52%,oklch(10%_0.04_264deg/0.92)_100%)]',
      )}
      aria-hidden
    />
    <div
      className={cn(
        'pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t',
        'from-background via-transparent to-transparent',
        'dark:from-[oklch(12%_0.05_264deg)] dark:via-transparent dark:to-transparent',
      )}
      aria-hidden
    />

    <div className="relative z-10 flex min-h-[min(78vh,52rem)] flex-col items-center justify-center px-6 py-20 text-center">
      <Typography
        variant="h1"
        className={cn(
          'max-w-3xl bg-gradient-to-br bg-clip-text text-4xl font-semibold tracking-tight text-transparent sm:text-5xl md:text-6xl',
          'from-slate-900 via-sky-800 to-sky-600',
          'dark:from-white dark:via-sky-100 dark:to-sky-300/90',
        )}
      >
        Clothing and electronics in one catalog
      </Typography>
      <Typography
        variant="body1"
        className={cn(
          'mt-5 max-w-xl text-base sm:text-lg',
          'text-slate-600',
          'dark:text-sky-100/75',
        )}
      >
        Find your next outfit or gadget with curated categories, transparent
        pricing, and fast product previews.
      </Typography>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button
          asChild
          size="lg"
          className="shadow-lg shadow-sky-500/15 dark:shadow-sky-500/20"
        >
          <Link href={pagesPath.products.$url().path}>Browse products</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href={pagesPath.categories.$url().path}>Categories</Link>
        </Button>
      </div>
    </div>

    <p
      className={cn(
        'pointer-events-none absolute bottom-6 left-0 right-0 text-center text-[clamp(0.7rem,2.5vw,1.15rem)] font-semibold uppercase tracking-[0.45em]',
        'text-slate-400/25',
        'dark:text-white/[0.055]',
      )}
      aria-hidden
    >
      ESCUELA
    </p>
  </section>
);
