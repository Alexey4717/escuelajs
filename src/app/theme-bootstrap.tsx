import Script from 'next/script';

/**
 * Синхронный скрипт до первой отрисовки: читает `theme` из cookie и localStorage,
 * выставляет `class="dark"` и `data-theme` на `<html>`, чтобы уменьшить flash.
 * Код вынесен в `/public/scripts/theme-bootstrap.js`, чтобы не использовать inline `<script>`
 * в дереве React 19 (такие скрипты на клиенте не выполняются).
 */
export function ThemeBootstrapScript() {
  return (
    <Script
      id="theme-bootstrap"
      src="/scripts/theme-bootstrap.js"
      strategy="beforeInteractive"
    />
  );
}
