This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Шрифты подключаются через [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) ([Geist](https://vercel.com/font)).

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Dev server (Turbopack). |
| `pnpm scss:types` | Generates `*.module.scss.d.ts` for CSS Modules typings. |
| `pnpm scss:types:check` | Verifies generated `*.module.scss.d.ts` are up to date (fails on diff). |
| `pnpm build` | Production build. |
| `pnpm start` | Serve the last production build. |
| `pnpm clean` | Deletes build and cache folders: `.next`, `out`, `build`, `coverage`, `.turbo` (via [`rimraf`](https://www.npmjs.com/package/rimraf), cross-platform). |
| `pnpm clean:full` | Runs `clean`, then removes `node_modules`. Run `pnpm install` afterward. |
| `pnpm lint` | ESLint (`src`, `e2e`, корневые `next.config.ts`, `vitest.config.ts`, `playwright.config.ts`, `babel.config.js`) и Stylelint (CSS/SCSS). Fails on warnings (ESLint `--max-warnings 0`). |
| `pnpm lint:fix` | Same linters with auto-fix. |
| `pnpm lint:ts` | ESLint только по перечисленным путям (см. [`package.json`](package.json)): `./src/**/*.{ts,tsx}`, `./e2e/**/*.ts`, корневые конфиги. Явный список вместо глобального `**/*.{ts,tsx}` — меньше риска затронуть посторонние каталоги без донастройки ignore; при необходимости можно сузить до `./src` и отдельно добавить нужные файлы. |
| `pnpm lint:ts:fix` | ESLint с `--fix` для тех же путей (`--no-warn-ignored`). |
| `pnpm lint:style` | Stylelint for `**/*.{css,scss}` (see `.stylelintrc.cjs`). |
| `pnpm lint:style:fix` | Stylelint with `--fix`. |
| `pnpm prettier` | Prettier write for `ts`, `tsx`, `json`, `css`, `scss`. |
| `pnpm prettier:check` | Prettier check only (no writes); useful in CI. |
| `pnpm analyze` | Bundle analyzer (see below). |
| `pnpm prepare` | Installs [Husky](https://typicode.github.io/husky/) git hooks after `pnpm install`. |
| `pnpm pathpida` | Генерация [`src/shared/config/routes/$path.ts`](src/shared/config/routes/$path.ts) из `src/app/` (pathpida + Prettier). Запускать после изменений роутов в `app`; см. [Типизированные URL (pathpida)](#типизированные-url-pathpida). |
| `pnpm dev:path` | pathpida в режиме `--watch` для перегенерации при правках `app`. |
| `pnpm codegen` | GraphQL Codegen: [`graphql.ts`](src/shared/api/generated/graphql.ts), [`apolloCachePolicies.ts`](src/shared/api/generated/apolloCachePolicies.ts). После записи файлов в [`codegen.ts`](codegen.ts) через `hooks.afterAllFileWrite` запускается **`prettier --write`**, чтобы вывод совпадал с `prettier.config.mjs` (сырой текст плагина и Prettier расходятся по кавычкам и переносам). См. [Codegen и политики кеша Apollo](#codegen-и-политики-кеша-apollo). |
| `pnpm verify:generated` | Проверка сгенерированных артефактов: `codegen`, Prettier для `src/shared/api/generated/*.ts`, pathpida, Prettier для [`$path.ts`](src/shared/config/routes/$path.ts), `scss:types:check`, затем `git diff` по generated-путям (включая `*.module.scss.d.ts`). См. [CI: сгенерированные файлы](#ci-сгенерированные-файлы). |
| `pnpm test:unit` | Один прогон unit/integration: [Vitest](https://vitest.dev/) + Testing Library + [MSW](https://mswjs.io/) (сеть к GraphQL не уходит — только моки). Конфиг: [`vitest.config.ts`](vitest.config.ts). |
| `pnpm test:unit:watch` | Vitest в режиме watch (локальная разработка тестов). |
| `pnpm test:unit:coverage` | Vitest с отчётом покрытия (V8). |
| `pnpm test:e2e` | E2E: [Playwright](https://playwright.dev/), каталог [`e2e/`](e2e). Поднимает dev-сервер через `webServer` в [`playwright.config.ts`](playwright.config.ts) (или использует уже запущенный `pnpm dev`). |
| `pnpm test:e2e:ui` | Playwright с UI-режимом отладки. |

TypeScript is checked during `pnpm build` (and via your editor). This stack uses **ESLint** directly (not `next lint` — not exposed in Next.js 16 CLI here).

### Тестирование

- **Unit и integration** — colocated: `*.test.ts` / `*.test.tsx` рядом с кодом; общие хелперы (рендер с Apollo, MSW, сброс Zustand) экспортируются только из [`src/test/testing.ts`](src/test/testing.ts), не из продовых `index.ts`.
- **Имена файлов** — базовый шаблон `*.test.ts(x)`; для отдельного окружения Vitest (например, `node` без jsdom) вместо общего `src/**/*.test.ts` можно использовать суффиксы вроде **`*.node.test.ts`** и директиву `/** @vitest-environment node */` в начале файла (см. пример в репозитории).
- **E2E** — сценарии в [`e2e/`](e2e); для первого клонирования репозитория установите браузеры Playwright: `pnpm exec playwright install` (в CI обычно кэшируют эту установку).
- Типы и IDE: при необходимости подключайте [`tsconfig.vitest.json`](tsconfig.vitest.json) в настройках TypeScript проекта (или используйте «Solution» с несколькими `tsconfig`).

## Версии и релизы

Релизы и [`CHANGELOG.md`](CHANGELOG.md) ведутся автоматически через **[semantic-release](https://github.com/semantic-release/semantic-release)** в GitHub Actions (job **Release** после успешного CI на push в `main`). Нужны **[Conventional Commits](https://www.conventionalcommits.org/)** в сообщениях коммитов (`feat:`, `fix:`, `BREAKING CHANGE:` и т.д.), иначе версия может не подняться до следующего подходящего коммита. Локально формат проверяет **[commitlint](https://commitlint.js.org/)** в хуке **`.husky/commit-msg`** (не в `pre-commit`: текст сообщения к этому моменту ещё не зафиксирован). Merge- и revert-коммиты из Git пропускаются.

- **Версия в `package.json`** обновляется релизным процессом вместе с `CHANGELOG.md` и GitHub Release (публикация в npm отключена: `private: true`).
- **Права в репозитории:** для job Release у GitHub Actions должны быть разрешены запись в содержимое и создание релизов (см. Settings → Actions → Workflow permissions).

### CI: сгенерированные файлы

В pipeline после линтеров выполняется **`pnpm verify:generated`**: перезапускаются GraphQL Codegen и pathpida, для сгенерированных `*.ts` применяется тот же Prettier, дополнительно проверяется актуальность `*.module.scss.d.ts` через `scss:types:check`, затем **`git diff`** по `src/shared/api/generated/`, [`src/shared/config/routes/$path.ts`](src/shared/config/routes/$path.ts) и `*.module.scss.d.ts` (остальные незакоммиченные файлы на результат не влияют). Если забыли выполнить `pnpm codegen`, `pnpm pathpida` или обновить SCSS typings после правок модулей стилей, job упадёт — сгенерируйте файлы локально и закоммитьте.

До production build в job **quality** также выполняются **`pnpm test:unit`**, установка Chromium для Playwright (**`pnpm exec playwright install --with-deps chromium`**) и **`pnpm test:e2e`**; затем **`pnpm build`** (та же команда, что и на проде). См. [`.github/workflows/ci.yml`](.github/workflows/ci.yml).

**Git hooks:** `.husky/pre-commit` — `lint-staged` (Prettier, ESLint/Stylelint для staged `*.{ts,tsx}` и `*.{css,scss}`). `.husky/commit-msg` — `commitlint` по [`commitlint.config.cjs`](commitlint.config.cjs) (Conventional Commits), вызов через **`node`** к локальному CLI, чтобы коммит из GUI (GitHub Desktop, Cursor и т.д.) не ломался из‑за отсутствия `pnpm` в `PATH`. Сообщение должно быть вроде **`feat: …`**, **`fix: …`**, **`chore: …`** (scope необязателен: `feat(api): …`).

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

### Типизированные URL (pathpida)

По структуре `src/app/` генерируется файл [`src/shared/config/routes/$path.ts`](src/shared/config/routes/$path.ts) (импорт: [`@/shared/config/routes/$path`](src/shared/config/routes/$path.ts), объект **`pagesPath`**). Это нужно, чтобы ссылки и `router.push` не расходились с реальными роутами App Router и ловились типами TypeScript.

**Когда запускать:** после добавления, переименования или удаления страниц/сегментов в `src/app/` (аналогично тому, как после смены GraphQL-схемы запускают `pnpm codegen`). Сгенерированный `$path.ts` **коммитится** в репозиторий.

| Команда | Назначение |
| --- | --- |
| `pnpm pathpida` | Один раз пересобрать `$path.ts` и отформатировать его Prettier. |
| `pnpm dev:path` | Режим `--watch`: перегенерация при изменениях в `app` (удобно держать в отдельном терминале во время правок роутов). |

**Что возвращает `pagesPath....$url(...)`:** объект с полями **`pathname`**, **`path`**, при необходимости **`query`** / **`hash`**.

- **`pathname`** — маршрут в формате Next.js: для статических страниц это тот же путь, что в браузере (`/register`); для динамических — шаблон с сегментами в квадратных скобках (`/products/[id]`). Используется в сценариях с объектным `href` и отдельным `query` (как в API `next/router`).
- **`path`** — уже **готовая строка** URL: подставлены значения динамических сегментов, при вызове `$url({ query, hash })` добавлены query-string и фрагмент. Для `<Link href={...}>` и большинства переходов в App Router обычно берут **`path`**.
- **`hash`** — отдельно переданный фрагмент `#...` из аргумента `$url({ hash: '...' })` (в **`path`** он тоже попадает через суффикс).

### GraphQL, BFF и токены (HttpOnly)

Upstream API: **`https://api.escuelajs.co/graphql`**. Браузер **не** ходит туда напрямую: Apollo шлёт запросы на **`/api/graphql`** (тот же origin). [Route Handler](src/app/api/graphql/route.ts) подставляет к upstream **`Authorization: Bearer`** из HttpOnly cookie и, для ответов мутаций **`login`** / **`refreshToken`**, выставляет cookie через [`auth-cookies`](src/shared/lib/auth-cookies.ts), а тела ответов **очищает от токенов** (чтобы они не попадали в кеш Apollo).

- **Вход / refresh:** мутации `Login` ([`routes/login/api`](src/routes/login/api/auth-login.graphql)), `AddUser` ([`routes/register/api`](src/routes/register/api/register-add-user.graphql)), `Auth_RefreshToken` ([`shared/api/graphql/api`](src/shared/api/graphql/api/auth-refresh-token.graphql)) через Apollo; отдельных `app/api/auth/*` нет.
- **Выход:** server action [`clearAuthSession`](src/shared/api/auth/clear-auth-session.ts) — сброс cookie на сервере без отдельного route.

**SSR:** для абсолютного URL к `/api/graphql` используется [`getAppOrigin()`](src/shared/lib/app-origin.ts) (`NEXT_PUBLIC_APP_URL` или `VERCEL_URL` или `http://localhost:3000`). В проде задайте **`NEXT_PUBLIC_APP_URL`**.

**Маршруты:** публичные **`/`**, **`/login`**; защищённый **`/profile`** (middleware + наличие cookie). См. [`middleware.ts`](middleware.ts).

### TanStack Query (REST)

В проекте TanStack Query используется для REST-запросов к Escuela API (например, `files` и `locations`), а Apollo остаётся для GraphQL.

- **Провайдер:** [`QueryProvider`](src/shared/api/query-client/query-provider.tsx) подключён в корневом [`layout.tsx`](src/app/layout.tsx), в dev включает React Query Devtools.
- **QueryClient-конфиг:** [`makeQueryClient`](src/shared/api/query-client/make-query-client.ts) задаёт базовые defaults (`staleTime`, `gcTime`, retry-поведение, `refetchOnWindowFocus`).
- **SSR/CSR инстанс:** [`getQueryClient`](src/shared/api/query-client/get-query-client.ts) — на сервере новый клиент на запрос, в браузере singleton на вкладку.
- **REST query keys:** [`escuelaRestQueryKeys`](src/shared/api/rest/query-keys.ts) — единая фабрика ключей (`['escuela-rest', ...]`) для стабильной инвалидaции.
- **Инвалидация кеша:** утилиты TanStack-кеша в [`src/shared/lib/cache/tanstack/cache-utils.ts`](src/shared/lib/cache/tanstack/cache-utils.ts): `invalidateEscuelaRest`, `invalidateEscuelaRestFiles`, `invalidateEscuelaRestLocations`, `clearQueryCache`.

### RouteGuard для `/admin-panel` (server + client)

Доступ к **`/admin-panel`** реализован в два слоя:

- **Server guard (основной)** — в [`src/app/(store)/admin-panel/page.tsx`](src/app/(store)/admin-panel/page.tsx): на сервере читается `access_token`, извлекается `sub`, запрашивается `UserDetails` и для роли не `admin` выполняется `redirect('/forbidden')` до рендера контента.
- **Client guard (дополнительный)** — [`RouteGuard`](src/shared/ui/RouteGuard/RouteGuard.tsx): использует [`useCurrentUserRole`](src/entities/Session/model/use-current-user.ts) и делает `router.replace('/forbidden')`, если клиентское состояние роли не соответствует требуемой.

Страница [`/forbidden`](src/app/(store)/forbidden/page.tsx) показывает сообщение, что контент недоступен, и короткую подсказку как получить доступ (запросить роль `admin` у администратора).

**Где что вызывать**

- **Server Components:** только из [`@/shared/api/apollo-client/rsc`](src/shared/api/apollo-client/rsc/index.ts) — `getClient`, `query`, `PreloadQuery` (см. [Apollo RSC](#apollo-rsc); модуль помечен `server-only`, **не** реэкспортируется из корня `apollo-client`). Для операций, доступных без входа, токен не обязателен; если нужна сессия, cookie входящего запроса к Next должны попасть в `fetch` — это уже делает [`http-link`](src/shared/api/apollo-client/links/http-link.ts) через `next/headers`.
- **Клиентские компоненты:** хуки из `@apollo/client/react` — cookie уходят автоматически на `/api/graphql`.

#### Codegen и политики кеша Apollo

Схема: [`src/shared/api/graphql/schema.graphql`](src/shared/api/graphql/schema.graphql).
Импортирована вручную из https://api.escuelajs.co/graphql (т.к. отдельный сервер и не монорепа).
Операции — в [`src/shared/api/graphql/`](src/shared/api/graphql/) (папки по доменам: `auth`, `user`, …). Конфиг: [`codegen.ts`](codegen.ts).

Генерация TypeScript-типов и `TypedDocumentNode` в одном файле [`graphql.ts`](src/shared/api/generated/graphql.ts), политики кеша — [`apolloCachePolicies.ts`](src/shared/api/generated/apolloCachePolicies.ts).

**Когда запускать:** после изменения схемы, добавления/правки `.graphql` (новые запросы, переменные, фрагменты). Сгенерированные файлы **коммитятся** в репозиторий.

**Что генерируется**

- [`graphql.ts`](src/shared/api/generated/graphql.ts) — типы схемы, типы операций и `TypedDocumentNode`.
- [`apolloCachePolicies.ts`](src/shared/api/generated/apolloCachePolicies.ts) — политики `InMemoryCache`: пагинация `offset`/`limit` и при необходимости cursor (`after`/`first`); **корневые списки с аргументами без offset/cursor** (например `users(limit)`) — `queryListFieldsWithKeyArgs`; вложенные поля с аргументами и не-нормализованные типы. Логика в плагине [`tools/codegen-apollo-cache-plugin.js`](tools/codegen-apollo-cache-plugin.js) (те же `schema` и `documents`, что и у codegen). Политика для поля появляется, если это поле **есть в клиентских операциях** (см. `.graphql`).

Политики подключаются в [`make-apollo-client.ts`](src/shared/api/apollo-client/client/make-apollo-client.ts). Редактировать `apolloCachePolicies.ts` вручную не нужно — только перегенерация. Для cursor-пагинации на плоских списках используется [`cursorLimitPagination`](src/shared/lib/cache/apollo/mergePolicies/cursorLimitPagination.ts) (импорт в сгенерированном файле появится, если такие поля есть в схеме и в документах).

См. также: [keyArgs и пагинация в Apollo](https://www.apollographql.com/docs/react/pagination/key-args), [offset-based](https://www.apollographql.com/docs/react/pagination/offset-based).

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

## Bundle analysis

This project includes [`@next/bundle-analyzer`](https://www.npmjs.com/package/@next/bundle-analyzer). To build with Webpack and open interactive bundle reports (client, Node.js, and edge), run:

```bash
pnpm analyze
```

Reports are written to `.next/analyze/` as HTML files (for example `client.html`). Next.js 16 uses Turbopack for production builds by default; the analyzer requires Webpack, so the script passes `--webpack` to `next build`.

## Image
На проекте не используются Image from next/image, потому что по умолчанию не подгружает картинки с произвольных URL.
Для внешних адресов в next.config нужно явно разрешить хосты через images.remotePatterns (или domains в старых версиях). Это сделано специально: оптимизация и прокси изображений только с доверенных источников.
У Escuela в images приходят разные домены (imgur, unsplash, placehold.co и т.д.) и со временем могут появиться новые.
Пока лучше не тащить в конфиг бесконечный зоопарк доменов ради витрины с динамическими ссылками. Если позже захотите именно next/image (оптимизация, размеры, blur), можно сузить список доменов у API или проксировать картинки через свой роут и тогда настроить один origin.

## Модалки (Modal flow)

В проекте используется единый modal-flow: UI-обертка [`Modal`](src/shared/ui/Modal/Modal.tsx), глобальный хост в `app`, состояние открытости в Zustand (`openedModal`).

### Основные элементы

- **UI-адаптер:** [`src/shared/ui/Modal/Modal.tsx`](src/shared/ui/Modal/Modal.tsx)
  - mobile: рендерит `Drawer`
  - desktop: рендерит `Dialog`
- **Глобальный хост и провайдер:** [`src/app/modal/ui/ModalHost.tsx`](src/app/modal/ui/ModalHost.tsx), [`src/app/modal/ui/ModalProvider.tsx`](src/app/modal/ui/ModalProvider.tsx)
- **Реестр модалок:** [`src/app/modal/model/modal-registry.ts`](src/app/modal/model/modal-registry.ts)
- **Стор:** [`src/shared/lib/store/slices/modal/create-modal-slice.ts`](src/shared/lib/store/slices/modal/create-modal-slice.ts)
- **Типы ключей/пропсов модалок:** [`src/shared/lib/modal/types.ts`](src/shared/lib/modal/types.ts)

### Источник истины

- Источник истины для открытости: Zustand.
- Одновременно открыта только **одна** модалка.

### Как добавить новую модалку

1. Добавьте ключ и props в [`ModalRegistryMap`](src/shared/lib/modal/types.ts):

```ts
export interface ModalRegistryMap {
  profileDelete: { email: string };
  productEdit: { productId: string };
}
```

2. Создайте UI-компонент модалки в своей фиче/роуте (по FSD рядом с местом использования), например:
   - `src/routes/products/ui/components/ProductEditModalContent.tsx`

3. Зарегистрируйте модалку в [`modal-registry.ts`](src/app/modal/model/modal-registry.ts):
   - `component`
   - `title`, `description`
   - опционально `renderFooter`
   - опционально `dialogClassName` (только для desktop `Dialog`)

4. Создайте локальный хук в слое фичи/роута (не в `app`), например:
   - `src/routes/products/model/use-product-edit-modal.ts`
   - внутри вызывайте `openModal('productEdit', props)`.

### Типизация `openModal`

`openModal` типизирован по `ModalKey` и `ModalRegistryMap`, поэтому:

- неверный ключ (`openModal('productEdit1', ...)`) даст ошибку TypeScript;
- props проверяются по ключу модалки;
- при изменении `ModalRegistryMap` типы хука и стора синхронизируются автоматически.

### Footer и формы

- Для единообразного UI кнопки действий рекомендуется выносить в `footer` через `renderFooter` в registry.
- Если контент модалки — форма, `submit` можно делать из footer-кнопки через `type="submit"` и `form="form-id"` (форма может находиться в `content`).

## Zustand

Слайсы лучше описывать на уровне слоёв выше shared.
В самой shared описана конфигурация Zustand.

### Ленивое подключение слайсов (code splitting)

Идея: тяжёлый кусок состояния и логики подгружается **динамическим `import()`** только когда пользователь попал на нужный раздел (как `injectReducer` в Redux).

#### Как это устроено

Функция **`ensureLazySlice(name, loader)`**:

- принимает уникальный `name` (кэш: повторный вызов вернёт тот же `Promise`);
- `loader` должен вернуть Promise с объектом `{ applySlice }`;
- **`applySlice(api)`** получает `api` того же вида, что у Zustand (`setState`, `getState`, `subscribe`, …) и **дописывает** состояние и методы в корневой стор через `api.setState`.

#### Что сделать при добавлении ленивого слайса

1. Описать тип слайса (например `CartSlice`) и **расширить** `AppStore` в `app-store.ts`:  
   `export type AppStore = SessionSlice & CartSlice`  
   (либо поэтапно через пересечения.)
2. Реализовать `applyCartSlice(api: StoreApi<AppStore>)` в отдельном модуле, который попадёт только в чанк страницы корзины.
3. В клиентском компоненте (страница, layout сегмента) **один раз** вызвать:

```ts
import { ensureLazySlice } from '@/shared/lib/store';

await ensureLazySlice('cart', () =>
  import('@/entities/cart/model/apply-cart-slice').then((m) => ({
    applySlice: m.applyCartSlice,
  })),
);
```

Удобно обернуть вызов в `useEffect` или вызывать при `transition` на маршрут — главное, не полагаться на стор до `await`, если UI зависит от данных слайса.

4. Пока чанк не загружен, в сторе нет полей корзины — учитывайте **загрузку и ошибки** в UI.

### Полезные ссылки

- [Документация Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Предотвращение лишних ререндеров](https://docs.pmnd.rs/zustand/guides/prevent-rerenders-with-use-shallow)
- [TypeScript](https://docs.pmnd.rs/zustand/guides/typescript)
- [Slices / combine](https://docs.pmnd.rs/zustand/guides/slices-pattern)
