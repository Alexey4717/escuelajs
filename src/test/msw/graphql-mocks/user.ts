import { HttpResponse } from 'msw';

import { testGql } from './test-gql';

export const TEST_USER_ID = 'test-user-1';

export const userGraphqlHandlers = [
  testGql.mutation('AddUser', () =>
    HttpResponse.json({
      data: {
        addUser: {
          __typename: 'User',
          id: 'new-user-id',
          email: 'new@example.com',
          name: 'New User',
          role: 'customer',
          avatar: 'https://example.com/avatar.png',
          password: 'new-password',
          creationAt: '2020-01-01T00:00:00.000Z',
          updatedAt: '2020-01-01T00:00:00.000Z',
        },
      },
    }),
  ),
  testGql.query('UserDetails', ({ variables }) => {
    const id = String(variables.id);
    return HttpResponse.json({
      data: {
        user: {
          __typename: 'User',
          id,
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          role: 'customer',
          avatar: 'https://example.com/avatar.png',
          creationAt: '2020-01-01T00:00:00.000Z',
          updatedAt: '2020-01-01T00:00:00.000Z',
        },
      },
    });
  }),
  testGql.mutation('UpdateUser', ({ variables }) => {
    const id = String(variables.id);
    return HttpResponse.json({
      data: {
        updateUser: {
          __typename: 'User',
          id,
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          role: 'customer',
          avatar: 'https://example.com/avatar.png',
          creationAt: '2020-01-01T00:00:00.000Z',
          updatedAt: '2020-01-01T00:00:00.000Z',
        },
      },
    });
  }),
];
