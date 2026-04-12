import { graphql } from 'msw';

import { TEST_GRAPHQL_HTTP_URL } from '@/test/test-origin';

export const testGql = graphql.link(TEST_GRAPHQL_HTTP_URL);
