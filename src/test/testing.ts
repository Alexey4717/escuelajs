/**
 * Публичный API тестовой инфраструктуры. Импортируйте хелперы только из `@/test/testing`,
 * не из `index.ts` прод-модулей.
 */
export { graphqlHandlers, TEST_USER_ID } from '@/test/msw/graphql-handlers';
export { mswServer } from '@/test/msw/server';
export { renderWithProviders } from '@/test/render-with-providers';
export { resetAppStore } from '@/test/reset-app-store';
export { TEST_APP_ORIGIN, TEST_GRAPHQL_HTTP_URL } from '@/test/test-origin';
