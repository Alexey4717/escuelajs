'use client';

import { useCallback, useSyncExternalStore } from 'react';

import { Moon, Sun } from 'lucide-react';

import { THEME_COOKIE_MAX_AGE_SECONDS } from '@/shared/config/consts';
import { cn } from '@/shared/lib/styles/cn';
import { Button } from '@/shared/ui/Button/Button';

function subscribe(onStoreChange: () => void) {
  if (typeof document === 'undefined') {
    return () => {};
  }
  const el = document.documentElement;
  const obs = new MutationObserver(onStoreChange);
  obs.observe(el, { attributes: true, attributeFilter: ['class'] });
  return () => obs.disconnect();
}

function getSnapshot() {
  if (typeof document === 'undefined') {
    return false;
  }
  return document.documentElement.classList.contains('dark');
}

function getServerSnapshot() {
  return false;
}

export const ThemeToggleButton = () => {
  const isDark = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const toggleTheme = useCallback(() => {
    const nextDark = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', nextDark);
    const theme = nextDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.cookie = `theme=${theme};path=/;max-age=${THEME_COOKIE_MAX_AGE_SECONDS};SameSite=Lax`;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
      className={cn(
        'rounded-md border border-white/12 text-inherit',
        'hover:bg-white/10 dark:hover:bg-white/10',
      )}
      suppressHydrationWarning
    >
      {isDark ? (
        <Sun className="size-[18px]" aria-hidden strokeWidth={1.75} />
      ) : (
        <Moon className="size-[18px]" aria-hidden strokeWidth={1.75} />
      )}
    </Button>
  );
};
