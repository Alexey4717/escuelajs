import type { CodegenConfig } from '@graphql-codegen/cli';

/**
 * Операции — в сегментах api/*.graphql (FSD).
 *
 * Имена операций/мутаций: **`Домен_Действие`** (например `Auth_Login`, `Profile_MyProfile`,
 * `Register_AddUser`, `Auth_RefreshToken`) — так они не пересекаются с типами GraphQL и
 * однозначны в поиске по репозиторию. Фрагменты: **`Тип_Назначение`** (`Category_ListItem`).
 *
 * Подсказки полей в `gql` внутри `.ts` даёт `graphql.config.yml` + расширение GraphQL в IDE.
 * Типы и `TypedDocumentNode` — из `pnpm codegen` по этим `.graphql` файлам.
 * (Альтернатива: graphql-tag-pluck по `*.ts` — см. документацию The Guild Codegen.)
 */
const config: CodegenConfig = {
  schema: 'src/shared/api/graphql/schema.graphql',
  documents: ['src/**/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    'src/shared/api/graphql/generated/types.ts': {
      plugins: ['typescript'],
      config: {
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: true,
          defaultValue: false,
        },
        enumsAsTypes: true,
      },
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: '~src/shared/api/graphql/generated/types',
      },
      /**
       * `typescript-operations` — типы запросов; `typed-document-node` — `TypedDocumentNode`
       * для вывода `data`/`variables` в Apollo без ручных дженериков.
       */
      plugins: ['typescript-operations', 'typed-document-node'],
      config: {
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: true,
          defaultValue: false,
        },
        gqlImport: '@apollo/client#gql',
      },
    },
    /** Политики merge/keyArgs для InMemoryCache (см. `tools/codegen-apollo-cache-plugin.js`). */
    'src/shared/api/graphql/generated/apolloCachePolicies.ts': {
      plugins: ['./tools/codegen-apollo-cache-plugin.js'],
    },
  },
};

export default config;
