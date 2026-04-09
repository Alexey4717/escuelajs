/** Должен совпадать с `environmentOptions.jsdom.url` в `vitest.config.ts` и с `getAppOrigin()` в тестах. */
export const TEST_APP_ORIGIN = 'http://localhost:3000';

export const TEST_GRAPHQL_HTTP_URL = `${TEST_APP_ORIGIN}/api/graphql`;
