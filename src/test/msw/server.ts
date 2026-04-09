import { setupServer } from 'msw/node';

import { graphqlHandlers } from './graphql-handlers';

export const mswServer = setupServer(...graphqlHandlers);
