import { HttpResponse } from 'msw';

import { testGql } from './test-gql';

export const loginGraphqlHandlers = [
  testGql.mutation('Login', () => {
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
];
