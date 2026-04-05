import type { CodegenConfig } from '@graphql-codegen/cli';

/**
 * Операции — в `src/shared/api/graphql/<домен>/*.graphql` (user, category, product, auth).
 *
 * Имена операций/мутаций: **`Домен_Действие`** или короткое имя в общем слое (например `Login`,
 * `User_ById`, `MyProfile`, `AddUser`) — так они не пересекаются с типами GraphQL и
 * однозначны в поиске по репозиторию. Фрагменты: **`Тип_Назначение`** (`Category_Preview`, `Product_Full`).
 *
 * Типы схемы, типы операций и `TypedDocumentNode` — из `pnpm codegen` в одном файле
 * `shared/api/generated/graphql.ts`.
 *
 * Общие фрагменты (например `Category_Preview`) встраиваются в каждую зависимую операцию
 * и дублируются в отдельных `*FragmentDoc` — это нормально; в dev `graphql-tag` может
 * ругаться на имя, пока не вызван `disableFragmentWarnings` (см. `makeApolloClient`).
 */
const config: CodegenConfig = {
  schema: 'src/shared/api/graphql/schema.graphql',
  documents: ['src/shared/api/graphql/*/**/*.graphql'],
  ignoreNoDocuments: true,
  /** После записи файлов — Prettier (как в CI `verify:generated`), иначе сырой вывод плагина расходится с `prettier.config.mjs`. */
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
  generates: {
    'src/shared/api/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: true,
          defaultValue: false,
        },
        enumsAsTypes: true,
        gqlImport: '@apollo/client#gql',
      },
    },
    /** Политики merge/keyArgs для InMemoryCache (см. `tools/codegen-apollo-cache-plugin.js`). */
    'src/shared/api/generated/apolloCachePolicies.ts': {
      plugins: ['./tools/codegen-apollo-cache-plugin.js'],
    },
  },
};

export default config;
