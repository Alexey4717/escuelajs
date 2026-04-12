import { loginGraphqlHandlers } from './graphql-mocks/login';
import { TEST_USER_ID, userGraphqlHandlers } from './graphql-mocks/user';

export { TEST_USER_ID };

/** Базовые GraphQL handlers для Vitest (MSW). Переопределяйте через `server.use` в отдельных тестах. */
export const graphqlHandlers = [
  ...loginGraphqlHandlers,
  ...userGraphqlHandlers,
];
