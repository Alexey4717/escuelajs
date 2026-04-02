import * as Types from 'src/shared/api/graphql/generated/types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Users_ListQueryVariables = Types.Exact<{
  limit: Types.InputMaybe<Types.Scalars['Float']['input']>;
}>;


export type Users_ListQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, email: string, name: string }> };


export const Users_ListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users_List"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<Users_ListQuery, Users_ListQueryVariables>;