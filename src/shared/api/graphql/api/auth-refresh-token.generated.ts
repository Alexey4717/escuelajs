import * as Types from 'src/shared/api/graphql/generated/types';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Auth_RefreshTokenMutationVariables = Types.Exact<{
  refreshToken: Types.Scalars['String']['input'];
}>;


export type Auth_RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'Login', access_token: string, refresh_token: string } };


export const Auth_RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Auth_RefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}}]}}]}}]} as unknown as DocumentNode<Auth_RefreshTokenMutation, Auth_RefreshTokenMutationVariables>;