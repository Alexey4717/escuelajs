'use client';

import { THEME_COOKIE_MAX_AGE_SECONDS } from '@/shared/config/consts';

export const ThemeToggle = () => {
  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    const theme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    document.cookie = `theme=${theme};path=/;max-age=${THEME_COOKIE_MAX_AGE_SECONDS};SameSite=Lax`;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* ignore */
    }
  };

  return (
    <button type="button" onClick={toggleTheme} aria-label="Переключить тему">
      🌙
    </button>
  );
};
