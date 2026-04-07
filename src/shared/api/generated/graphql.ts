import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Category = {
  __typename?: 'Category';
  creationAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateCategoryDto = {
  image: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateProductDto = {
  categoryId: Scalars['Float']['input'];
  description: Scalars['String']['input'];
  images: Array<Scalars['String']['input']>;
  price: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type CreateUserDto = {
  avatar: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role?: InputMaybe<Role>;
};

export type Login = {
  __typename?: 'Login';
  access_token: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategory: Category;
  addProduct: Product;
  addUser: User;
  deleteCategory: Scalars['Boolean']['output'];
  deleteProduct: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  login: Login;
  refreshToken: Login;
  updateCategory: Category;
  updateProduct: Product;
  updateUser: User;
};


export type MutationAddCategoryArgs = {
  data: CreateCategoryDto;
};


export type MutationAddProductArgs = {
  data: CreateProductDto;
};


export type MutationAddUserArgs = {
  data: CreateUserDto;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationUpdateCategoryArgs = {
  changes: UpdateCategoryDto;
  id: Scalars['ID']['input'];
};


export type MutationUpdateProductArgs = {
  changes: UpdateProductDto;
  id: Scalars['ID']['input'];
};


export type MutationUpdateUserArgs = {
  changes: UpdateUserDto;
  id: Scalars['ID']['input'];
};

export type Product = {
  __typename?: 'Product';
  category: Category;
  creationAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  images: Array<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  category: Category;
  isAvailable: Scalars['Boolean']['output'];
  myProfile: User;
  product: Product;
  products: Array<Product>;
  user: User;
  users: Array<User>;
};


export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryIsAvailableArgs = {
  email: Scalars['String']['input'];
};


export type QueryProductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductsArgs = {
  categoryId: InputMaybe<Scalars['Float']['input']>;
  categorySlug: InputMaybe<Scalars['String']['input']>;
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
  price: InputMaybe<Scalars['Int']['input']>;
  price_max: InputMaybe<Scalars['Int']['input']>;
  price_min: InputMaybe<Scalars['Int']['input']>;
  title: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  limit: InputMaybe<Scalars['Float']['input']>;
};

export type Role =
  | 'admin'
  | 'customer';

export type UpdateCategoryDto = {
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductDto = {
  categoryId?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  price?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Role>;
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String']['output'];
  creationAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Login', access_token: string, refresh_token: string } };

export type RefreshTokenMutationVariables = Exact<{
  refreshToken: Scalars['String']['input'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'Login', access_token: string, refresh_token: string } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string, slug: string, image: string }> };

export type CategoryDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CategoryDetailsQuery = { __typename?: 'Query', category: { __typename?: 'Category', id: string, name: string, slug: string, image: string, creationAt: any, updatedAt: any } };

export type HomeLandingQueryVariables = Exact<{
  productsLimit: InputMaybe<Scalars['Int']['input']>;
  productsOffset: InputMaybe<Scalars['Int']['input']>;
  usersLimit: InputMaybe<Scalars['Float']['input']>;
}>;


export type HomeLandingQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, title: string, slug: string, price: number, images: Array<string>, category: { __typename?: 'Category', id: string, name: string, slug: string } }>, users: Array<{ __typename?: 'User', id: string, name: string, email: string, avatar: string, role: string }> };

export type ProductDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ProductDetailsQuery = { __typename?: 'Query', product: { __typename?: 'Product', id: string, title: string, slug: string, price: number, description: string, images: Array<string>, creationAt: any, updatedAt: any, category: { __typename?: 'Category', id: string, name: string, slug: string, image: string } } };

export type ProductsQueryVariables = Exact<{
  limit: InputMaybe<Scalars['Int']['input']>;
  offset: InputMaybe<Scalars['Int']['input']>;
}>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, title: string, slug: string, price: number, images: Array<string>, category: { __typename?: 'Category', id: string, name: string, slug: string } }> };

export type AddUserMutationVariables = Exact<{
  data: CreateUserDto;
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser: { __typename?: 'User', id: string, email: string, name: string, role: string, avatar: string } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  changes: UpdateUserDto;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name: string, email: string, role: string, avatar: string } };

export type MyProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type MyProfileQuery = { __typename?: 'Query', myProfile: { __typename?: 'User', id: string, name: string, email: string, role: string, avatar: string, creationAt: any, updatedAt: any } };

export type UserDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserDetailsQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, email: string, role: string, avatar: string, creationAt: any, updatedAt: any } };

export type UsersQueryVariables = Exact<{
  limit: InputMaybe<Scalars['Float']['input']>;
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, name: string, email: string, avatar: string, role: string }> };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"refreshToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"refreshToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const CategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<CategoriesQuery, CategoriesQueryVariables>;
export const CategoryDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CategoryDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"creationAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CategoryDetailsQuery, CategoryDetailsQueryVariables>;
export const HomeLandingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomeLanding"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productsLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productsOffset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"usersLimit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productsLimit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productsOffset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"usersLimit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<HomeLandingQuery, HomeLandingQueryVariables>;
export const ProductDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"creationAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ProductDetailsQuery, ProductDetailsQueryVariables>;
export const ProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Products"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"images"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<ProductsQuery, ProductsQueryVariables>;
export const AddUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]} as unknown as DocumentNode<AddUserMutation, AddUserMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"changes"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserDto"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"changes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"changes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const MyProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"creationAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<MyProfileQuery, MyProfileQueryVariables>;
export const UserDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"creationAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UserDetailsQuery, UserDetailsQueryVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Users"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;