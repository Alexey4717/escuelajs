import { graphql, HttpResponse } from 'msw';

import { TEST_GRAPHQL_HTTP_URL } from '@/test/test-origin';

const gql = graphql.link(TEST_GRAPHQL_HTTP_URL);

export const TEST_USER_ID = 'test-user-1';

/** Базовые GraphQL handlers для Vitest (MSW). Переопределяйте через `server.use` в отдельных тестах. */
export const graphqlHandlers = [
  gql.mutation('Login', () => {
    return HttpResponse.json({
      data: {
        login: {
          __typename: 'Login',
          access_token: 'access-test-token',
          refresh_token: 'refresh-test-token',
        },
      },
    });
  }),
  gql.mutation('AddUser', () => {
    return HttpResponse.json({
      data: {
        addUser: {
          __typename: 'User',
          id: 'new-user-id',
          email: 'new@example.com',
          name: 'New User',
          role: 'customer',
          avatar: 'https://example.com/avatar.png',
        },
      },
    });
  }),
  gql.query('UserDetails', ({ variables }) => {
    const id = String(variables.id);
    return HttpResponse.json({
      data: {
        user: {
          __typename: 'User',
          id,
          name: 'Test User',
          email: 'test@example.com',
          role: 'customer',
          avatar: 'https://example.com/avatar.png',
          creationAt: '2020-01-01T00:00:00.000Z',
          updatedAt: '2020-01-01T00:00:00.000Z',
        },
      },
    });
  }),
];
