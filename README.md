This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Шрифты подключаются через [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) ([Geist](https://vercel.com/font)).

## Архитектура приложения

### Структура `src/`

Архитектура по паттерну Feature-Sliced Design, но с учетом ограничений и особенностей Next.js.

| Путь | Назначение |
| --- | --- |
| `src/app/` | App Router, BFF [`/api/graphql`](src/app/api/graphql/route.ts), страницы. |
| `src/routes/` | Слой страниц FSD (не путать с Next.js `pages/` — в проекте только App Router). |
| `src/widgets/` | Виджеты по FSD. |
| `src/features/` | Фичи по FSD. |
| `src/shared/` | Переиспользуемый функционал для всего проекта |

### GraphQL, BFF и токены (HttpOnly)

Upstream API: **`https://api.escuelajs.co/graphql`**. Браузер **не** ходит туда напрямую: Apollo шлёт запросы на **`/api/graphql`** (тот же origin). [Route Handler](src/app/api/graphql/route.ts) подставляет к upstream **`Authorization: Bearer`** из HttpOnly cookie и, для ответов мутаций **`login`** / **`refreshToken`**, выставляет cookie через [`auth-cookies`](src/shared/lib/auth-cookies.ts), а тела ответов **очищает от токенов** (чтобы они не попадали в кеш Apollo).

- **Вход / refresh:** мутации [`LOGIN` / `REFRESH_TOKEN`](src/shared/api/graphql/auth.ts) через Apollo; отдельных `app/api/auth/*` нет.
- **Выход:** server action [`clearAuthSession`](src/shared/api/auth/clear-auth-session.ts) — сброс cookie на сервере без отдельного route.

**SSR:** для абсолютного URL к `/api/graphql` используется [`getAppOrigin()`](src/shared/lib/app-origin.ts) (`NEXT_PUBLIC_APP_URL` или `VERCEL_URL` или `http://localhost:3000`). В проде задайте **`NEXT_PUBLIC_APP_URL`**.

**Маршруты:** публичные **`/`**, **`/login`**; защищённый **`/profile`** (middleware + наличие cookie). См. [`middleware.ts`](middleware.ts).

**Где что вызывать**

- **Server Components:** импорт из `apollo-rsc` — публичные запросы без токена; для запросов с сессией cookie должны приходить в запросе (проброс в `fetch` уже в `httpLink`).
- **Клиентские компоненты:** хуки из `@apollo/client/react` — cookie уходят автоматически на `/api/graphql`.

### Тема оформления (light / dark)

Цель — совместить **shadcn** (класс **`dark`** на `<html>` и CSS-переменные) и атрибут **`data-theme`**.

1. **Сервер** — в [`src/app/layout.tsx`](src/app/layout.tsx) читается cookie **`theme`** (`dark` / иначе считается светлой темой для первого HTML). На `<html>` выставляются `data-theme` и класс `dark` при `theme=dark`.
2. **Скрипт до отрисовки** — [`src/app/theme-bootstrap.tsx`](src/app/theme-bootstrap.tsx) в `<head>` синхронно переопределяет тему по приоритету: cookie `theme` → `localStorage.getItem('theme')` → системная `prefers-color-scheme: dark`. Так уменьшается мигание при рассинхроне cookie и локального выбора. На `<html>` используется **`suppressHydrationWarning`**, потому что скрипт может слегка отличаться от серверной разметки.

При переключении темы в UI имеет смысл обновлять и cookie (например через server action или route handler), и `localStorage`, чтобы поведение совпадало при следующих заходах и при SSR.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Dev server (Turbopack). |
| `pnpm build` | Production build. |
| `pnpm start` | Serve the last production build. |
| `pnpm clean` | Deletes build and cache folders: `.next`, `out`, `build`, `coverage`, `.turbo` (via [`rimraf`](https://www.npmjs.com/package/rimraf), cross-platform). |
| `pnpm clean:full` | Runs `clean`, then removes `node_modules`. Run `pnpm install` afterward. |
| `pnpm lint` | ESLint (`src` + `next.config.ts`) and Stylelint (CSS/SCSS). Fails on warnings (ESLint `--max-warnings 0`). |
| `pnpm lint:fix` | Same linters with auto-fix. |
| `pnpm lint:ts` | ESLint only for `./src/**/*.{ts,tsx}` and `./next.config.ts`. |
| `pnpm lint:ts:fix` | ESLint with `--fix` for the same paths. |
| `pnpm lint:style` | Stylelint for `**/*.{css,scss}` (see `.stylelintrc.cjs`). |
| `pnpm lint:style:fix` | Stylelint with `--fix`. |
| `pnpm prettier` | Prettier write for `ts`, `tsx`, `json`, `css`, `scss`. |
| `pnpm prettier:check` | Prettier check only (no writes); useful in CI. |
| `pnpm analyze` | Bundle analyzer (see below). |
| `pnpm prepare` | Installs [Husky](https://typicode.github.io/husky/) git hooks after `pnpm install`. |

TypeScript is checked during `pnpm build` (and via your editor). This stack uses **ESLint** directly (not `next lint` — not exposed in Next.js 16 CLI here).

**Pre-commit:** `.husky/pre-commit` runs `lint-staged`: Prettier and ESLint/Stylelint with fix on staged `*.{ts,tsx}` and `*.{css,scss}`. Ensure the repo is initialized with `git` so hooks apply.

## Bundle analysis

This project includes [`@next/bundle-analyzer`](https://www.npmjs.com/package/@next/bundle-analyzer). To build with Webpack and open interactive bundle reports (client, Node.js, and edge), run:

```bash
pnpm analyze
```

Reports are written to `.next/analyze/` as HTML files (for example `client.html`). Next.js 16 uses Turbopack for production builds by default; the analyzer requires Webpack, so the script passes `--webpack` to `next build`.
