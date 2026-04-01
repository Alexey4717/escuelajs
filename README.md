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

- **Server Components:** только из [`@/shared/api/apollo-client/rsc`](src/shared/api/apollo-client/rsc/index.ts) — `getClient`, `query`, `PreloadQuery` (см. [Apollo RSC](#apollo-rsc); модуль помечен `server-only`, **не** реэкспортируется из корня `apollo-client`). Для операций, доступных без входа, токен не обязателен; если нужна сессия, cookie входящего запроса к Next должны попасть в `fetch` — это уже делает [`http-link`](src/shared/api/apollo-client/links/http-link.ts) через `next/headers`.
- **Клиентские компоненты:** хуки из `@apollo/client/react` — cookie уходят автоматически на `/api/graphql`.

#### Apollo RSC

Интеграция [`@apollo/client-integration-nextjs`](https://www.npmjs.com/package/@apollo/client-integration-nextjs) связывает Apollo с App Router и **React Server Components**: в [`rsc/apollo-rsc.ts`](src/shared/api/apollo-client/rsc/apollo-rsc.ts) вызывается [`registerApolloClient`](https://www.apollographql.com/docs/react/integrations/nextjs/), из [`@/shared/api/apollo-client/rsc`](src/shared/api/apollo-client/rsc/index.ts) экспортируются **`getClient`**, **`query`**, **`PreloadQuery`**.

- **Зачем:** выполнять GraphQL на **сервере** при рендере RSC (данные можно получить до отдачи HTML), держать один контракт с клиентским Apollo и при необходимости предзагружать данные для гидрации (`PreloadQuery`).
- **Связь с BFF:** тот же **`HttpLink`** на **`/api/graphql`**; [BFF `route.ts`](src/app/api/graphql/route.ts) по-прежнему проксирует на upstream. Серверный `query` ходит **в** этот маршрут, а не «в обход» Apollo.

```ts
import { getClient, query, PreloadQuery } from '@/shared/api/apollo-client/rsc';
```

**Структура [`shared/api/apollo-client/`](src/shared/api/apollo-client/)**

| Папка | Назначение |
| --- | --- |
| [`client/`](src/shared/api/apollo-client/client/) | Фабрика [`makeApolloClient`](src/shared/api/apollo-client/client/make-apollo-client.ts). |
| [`links/`](src/shared/api/apollo-client/links/) | Цепочка Apollo Link: [`http-link`](src/shared/api/apollo-client/links/http-link.ts), [`error-link`](src/shared/api/apollo-client/links/error-link.ts). |
| [`auth/`](src/shared/api/apollo-client/auth/) | Сессия в браузере: singleton клиента, [`refresh-token`](src/shared/api/apollo-client/auth/refresh-token.ts), [`isUnauthorized`](src/shared/api/apollo-client/auth/is-unauthorized.ts). |
| [`context/`](src/shared/api/apollo-client/context/) | Ключи контекста операций, например [`SKIP_ERROR_TOAST_KEY`](src/shared/api/apollo-client/context/context-keys.ts). |
| [`errors/`](src/shared/api/apollo-client/errors/) | Тексты для глобального toast — [`getErrorToastMessage`](src/shared/api/apollo-client/errors/get-error-toast-message.ts). |
| [`provider/`](src/shared/api/apollo-client/provider/) | Клиентский [`ApolloProvider`](src/shared/api/apollo-client/provider/apollo-provider.tsx) (обёртка `ApolloNextAppProvider` + регистрация браузерного клиента). Импорт: `@/shared/api/apollo-client/provider`. |
| [`rsc/`](src/shared/api/apollo-client/rsc/) | Регистрация Apollo для RSC — [`registerApolloClient`](https://www.apollographql.com/docs/react/integrations/nextjs/) (`getClient`, `query`, `PreloadQuery`). Импорт: `@/shared/api/apollo-client/rsc`. |
| [`index.ts`](src/shared/api/apollo-client/index.ts) | Публичный реэкспорт (`makeApolloClient`, контекст, `isUnauthorized`) для импорта из `@/shared/api/apollo-client`. Клиентский провайдер и RSC — отдельными путями (`provider/`, `rsc/`). |

**Тосты при ошибках (Apollo `ErrorLink`)**

В браузере глобальный [`ErrorLink`](src/shared/api/apollo-client/links/error-link.ts) показывает [Sonner](https://sonner.emilkowal.ski/) `toast.error` при сбоях запросов:

- HTTP **4xx** — «Что-то пошло не так».
- HTTP **5xx** — «Внутренняя ошибка сервера».
- Ошибки в теле GraphQL-ответа (`errors`) — «Что-то пошло не так».
- **401** и сценарии «нужен refresh» (см. [`isUnauthorized`](src/shared/api/apollo-client/auth/is-unauthorized.ts)) — тост **не** показывается, чтобы не дублировать обработку сессии.

Точечно отключить тост для одной операции можно через **контекст** Apollo: ключ [`SKIP_ERROR_TOAST_KEY`](src/shared/api/apollo-client/context/context-keys.ts) (`'skipErrorToast'`), реэкспортируется из [`@/shared/api/apollo-client`](src/shared/api/apollo-client/index.ts).

```ts
import { SKIP_ERROR_TOAST_KEY } from '@/shared/api/apollo-client';

// Опции хука (useQuery / useMutation / useLazyQuery)
useMutation(MY_MUTATION, {
  context: { [SKIP_ERROR_TOAST_KEY]: true },
});

// Или при вызове mutate / execute
mutate({ variables: { … } }, { context: { [SKIP_ERROR_TOAST_KEY]: true } });
```

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
