/**
 * Синхронный скрипт до первой отрисовки: читает `theme` из cookie и localStorage,
 * выставляет `class="dark"` (shadcn) и `data-theme` на `<html>`, чтобы уменьшить flash.
 */
export function ThemeBootstrapScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function(){
            try {
              var c = document.cookie.match(/(?:^|; )theme=([^;]*)/);
              var t = c ? decodeURIComponent(c[1]) : null;
              if (t == null && typeof localStorage !== 'undefined') {
                t = localStorage.getItem('theme');
              }
              var prefersDark = typeof window !== 'undefined' && window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches;
              var dark = t === 'dark' || (t !== 'light' && prefersDark);
              document.documentElement.classList.toggle('dark', dark);
              document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
            } catch (e) {}
          })();`,
      }}
    />
  );
}
