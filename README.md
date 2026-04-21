# EscuelaJS

Витрина и админка поверх публичного [Escuela JS API](https://api.escuelajs.co/graphql): Next.js (App Router), GraphQL через Apollo, часть REST через TanStack Query, UI на React 19 и shadcn/radix. Репозиторий заточен под предсказуемую разработку: строгие линтеры, проверка сгенерированных файлов в CI, unit и интеграционные тесты на Vitest, e2e на Playwright.

----

## Запуск проекта

```
Версия Node — 24.10.0;
Версия pnpm — 10.33.0;
pnpm install — установка зависимостей
pnpm dev — сервер разработки Next.js
```

Для продакшен-сборки и SSR к собственному приложению задайте **`NEXT_PUBLIC_APP_URL`** (см. `getAppOrigin` в коде). Секреты и локальные переменные — по вашему `.env` (см. .env.local.example).

----

## Скрипты

- `pnpm dev` — режим разработки
- `pnpm build` — production-сборка
- `pnpm start` — запуск уже собранного приложения
- `pnpm clean` — удаление артефактов сборки, кеша и отчётов тестов (`.next`, `out`, `coverage`, отчёты Playwright и т.д.)
- `pnpm clean:full` — как `clean`, плюс `node_modules` (после этого снова `pnpm install`)

**Качество кода**

- `pnpm lint` — ESLint (TypeScript/TSX, конфиги в корне) и Stylelint (CSS/SCSS); при любых предупреждениях ESLint команда падает (`--max-warnings 0`)
- `pnpm lint:fix` — то же с автоисправлением
- `pnpm lint:ts` / `pnpm lint:ts:fix` — только ESLint по явному списку путей (`src`, `e2e`, ключевые конфиги)
- `pnpm lint:style` / `pnpm lint:style:fix` — только Stylelint
- `pnpm prettier` — форматирование `ts`, `tsx`, `json`, `css`, `scss`
- `pnpm prettier:check` — проверка форматирования без записи (удобно перед коммитом и в CI)

**Стили и типы CSS Modules**

- `pnpm scss:types` — генерация `*.module.scss.d.ts`
- `pnpm scss:types:check` — проверка, что типы актуальны (падает при расхождении)

**Маршруты и GraphQL**

- `pnpm pathpida` — генерация типизированных путей `src/shared/config/routes/$path.ts` из `src/app/`
- `pnpm dev:path` — pathpida в режиме `--watch` (отдельный терминал при правках роутов)
- `pnpm codegen` — GraphQL Codegen (`graphql.ts`, `apolloCachePolicies.ts` в `src/shared/api/generated/`)

**Проверка сгенерированного**

- `pnpm verify:generated` — codegen, pathpida, Prettier для артефактов, проверка SCSS typings, затем `git diff` по ожидаемым путям (как в CI)

**Тесты**

- `pnpm test:unit` — Vitest (Testing Library, MSW для сети)
- `pnpm test:unit:watch` — Vitest в watch-режиме
- `pnpm test:unit:coverage` — покрытие (V8)
- `pnpm test:e2e` — Playwright (`e2e/`); при первом клоне: `pnpm exec playwright install`
- `pnpm test:e2e:ui` — Playwright с UI

**Прочее**

- `pnpm analyze` — анализ бандла (`@next/bundle-analyzer`; для отчёта сборка идёт через Webpack: `next build --webpack`)
- `pnpm prepare` — установка [Husky](https://typicode.github.io/husky/) после `pnpm install`
- `pnpm release` — локальный вызов semantic-release (основной релиз идёт из GitHub Actions на `main`)

TypeScript проверяется при `pnpm build` и в редакторе. Стек использует **ESLint напрямую**, без отдельной команды `next lint` из CLI Next.js.

----

## Архитектура

Проект ориентирован на **Feature-Sliced Design**: слои `shared`, `entities`, `features`, `widgets`, сегменты страниц в `routes`, при этом маршрутизация и корневой layout живут в **Next.js App Router** (`src/app/`). Это не классический «чистый» FSD из туториала, а практичная адаптация под ограничения и возможности Next.js.

Официальное введение в методологию: [Feature-Sliced Design](https://feature-sliced.design/docs/get-started/tutorial).

**Ориентиры по `src/`**

- `src/app/` — App Router, API route [`/api/graphql`](src/app/api/graphql/route.ts), композиция страниц
- `src/routes/` — страничный слой FSD (не путать с устаревшим `pages/` Next)
- `src/widgets/`, `src/features/`, `src/entities/` — виджеты, фичи, сущности
- `src/shared/` — переиспользуемый код, API-клиенты, UI-примитивы, утилиты
- `src/test/` — общие вещи для Vitest (точка входа, обёртки в провайдеры, MSW, моки)

**Стратегии рендера по смыслу**

- Статика и ISR — отдельные разделы каталога (например категории с `revalidate`)
- Динамический SSR — витрина товаров, главная и др. с `force-dynamic` там, где нужны свежие данные
- Сегменты с сессией и админкой — серверные проверки cookie и редиректы; админ-панель дополнительно защищена на сервере и клиентом (`RouteGuard`)

Подробности по Apollo (RSC, BFF, куки), TanStack Query, pathpida и codegen смотрите в исходниках: [`src/shared/api/apollo-client/`](src/shared/api/apollo-client/), [`src/app/api/graphql/route.ts`](src/app/api/graphql/route.ts), [`codegen.ts`](codegen.ts).

----

## Данные

- **GraphQL** — основной контракт с бэкендом; браузер ходит на **свой** origin (`/api/graphql`), route handler проксирует на upstream и работает с HttpOnly-сессией (токены не утекают в клиентский кеш ответов мутаций входа/refresh). Операции — файлы `.graphql` в `src/shared/api/graphql/` и рядом с фичами; типы и документы генерируются в `src/shared/api/generated/`.
- **REST** — TanStack Query для части Escuela REST API (файлы, локации); провайдер в корневом layout, ключи и инвалидция — в `src/shared/api/rest/` и связанных утилитах кеша.
- **Типизированные URL** — после изменений в `src/app/` запускайте `pnpm pathpida` (или `pnpm dev:path`); файл [`$path.ts`](src/shared/config/routes/$path.ts) коммитится в репозиторий.
- **Схема GraphQL** — [`schema.graphql`](src/shared/api/graphql/schema.graphql); после правок схемы или `.graphql` — `pnpm codegen` и коммит сгенерированных файлов.

----

## Тесты

- **Unit / integration** — Vitest, тесты рядом с кодом: `*.test.ts`, `*.test.tsx`. Общие хелперы для тестового рендера и моков — из [`src/test/testing.ts`](src/test/testing.ts), не из продовых `index.ts`.
- **E2E** — Playwright, каталог [`e2e/`](e2e). В CI поднимается dev-сервер через конфиг Playwright (или используйте уже запущенный `pnpm dev` локально).

Для отдельных файлов под окружение Node в Vitest можно использовать суффиксы вроде `*.node.test.ts` и директиву `/** @vitest-environment node */`.

----

## Линтинг и форматирование

В проекте **ESLint** (в том числе конфиг Next) для TypeScript/React и **Stylelint** для стилей. В **pre-commit** через Husky и lint-staged прогоняются Prettier, ESLint и Stylelint для индексированных файлов. Сообщения коммитов проверяет **commitlint** (Conventional Commits) в `.husky/commit-msg` — удобно писать в духе `feat: …`, `fix: …`, `chore: …`.

----

## CI и релизы

Файл [`.github/workflows/ci.yml`](.github/workflows/ci.yml): Prettier check, линтеры, **`pnpm verify:generated`**, unit-тесты, установка Chromium для Playwright, e2e, затем **`pnpm build`**. Push в `main` после зелёного CI запускает job **Release** с **semantic-release**: версия в `package.json`, `CHANGELOG.md` и GitHub Release обновляются по правилам Conventional Commits (публикация в npm отключена, `private: true`). Для job Release в настройках репозитория нужны права на запись контента и релизы.

Коммит с текстом `[skip ci]` не гоняет CI (см. условия в workflow).

----

## Заметки для разработчиков

**Анализ бандла** — `pnpm analyze`, отчёты в `.next/analyze/`.

**Картинки** — сознательно не используется `next/image` для произвольных внешних URL витрины (много разных доменов у демо-данных).

**Тема (светлая/тёмная)** — cookie `theme`, `data-theme` и класс `dark` на `<html>`, подстраховка скриптом из `public/scripts/theme-bootstrap.js` (см. [`layout.tsx`](src/app/layout.tsx), [`theme-bootstrap.tsx`](src/app/theme-bootstrap.tsx)).

**Модалки** — единый реестр и Zustand-состояние: [`ModalHost`](src/app/modal/ui/ModalHost.tsx), [`modal-registry.ts`](src/app/modal/model/modal-registry.ts), типы [`ModalRegistryMap`](src/shared/lib/modal/types.ts).

**Zustand** — корневая конфигурация в shared; тяжёлые слайсы можно подключать лениво через `ensureLazySlice` (см. [`src/shared/lib/store`](src/shared/lib/store)).

Шрифты подключаются через [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) (в проекте — Geist).

----

## Troubleshooting

Публичный бэкенд [Escuela JS API](https://api.escuelajs.co/graphql) — демо-сервис: в схеме GraphQL и в REST есть поля и операции, которые **ведут себя непредсказуемо или не работают**. Это не баги фронтенда в этом репозитории; при странных ошибках имеет смысл сначала проверить ответ upstream и тело `errors` в GraphQL.

**HTTP и коды ответа.** Для многих ситуаций, где ожидались бы коды **401**, **403** или **404**, сервер часто отвечает **500** или отдаёт GraphQL-ошибку без ясной семантики на уровне HTTP. Это нужно учитывать в UX и в логировании: по статусу одного запроса не всегда можно надёжно отличить «нет прав» от «не найдено».

**Поля и запросы в схеме, но не на практике.** В типе `Query` объявлены, например, **`myProfile`** и **`isAvailable`** — в реальных вызовах они нередко падают или ведут себя некорректно, хотя в SDL выглядят штатно. Если фича опирается на такие точки, нужно закладывать обходные пути (другие запросы, деградацию UI, моки в тестах).

**Нет явной документации бизнес-ограничений.** Правила вроде «нельзя удалить категорию, пока к ней привязаны товары» в открытой спецификации обычно **не описаны**: ошибка приходит уже в момент мутации, иногда обобщённо. Для админ-сценариев полезно дублировать очевидные ограничения в UI (подсказки, блокировка кнопки после проверки списка товаров и т.п.), не полагаясь только на текст ошибки с сервера.

**Сброс данных и идентификаторы.** На стороне сервера демо-набор **периодически откатывается к дефолтному** (порядка **раз в сутки**; точное окно не контролируется клиентом). У сущностей **нет стабильных UUID**: используются простые числовые id, и после сброса **тот же номер может указывать уже на другую сущность**, в том числе «ваш» пользователь с привычным id завтра может не существовать или быть чужим. Не стоит считать закладки с id, скриншоты админки и локальные заметки про «id=5» долговечной правдой о мире API.

**Общий доступ и сессия.** Это открытая песочница: **любой залогиненный пользователь может менять и удалять чужие сущности**, в том числе **вашу учётную запись**. Cookie с токеном при этом может оставаться «живой», пока срок не истёк, а сервер **не обязан** вернуть внятное «вас удалили» — возможны обрывы, пустые ответы или общие ошибки. Если поведение внезапно перестало сходиться с ожиданиями, **сначала попробуйте выйти и зайти снова** (новая сессия и актуальный контекст на демо-данных).
