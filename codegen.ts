import type { CodegenConfig } from '@graphql-codegen/cli';

/**
 * Операции — в сегментах api/*.graphql (FSD).
 *
 * Имена операций/мутаций: **`Домен_Действие`** (например `Auth_Login`, `Profile_MyProfile`,
 * `Register_AddUser`, `Auth_RefreshToken`) — так они не пересекаются с типами GraphQL и
 * однозначны в поиске по репозиторию. Фрагменты: **`Тип_Назначение`** (`Category_ListItem`).
 *
 * Подсказки полей в `gql` внутри `.ts` даёт `graphql.config.yml` + расширение GraphQL в IDE.
 * Типы и `DocumentNode` для сборки — из `pnpm codegen` по этим `.graphql` файлам.
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
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: true,
          defaultValue: false,
        },
        /** DocumentNode для Apollo (`useSuspenseQuery`, `PreloadQuery`, `useFragment`). */
        documentMode: 'documentNode',
        gqlImport: '@apollo/client#gql',
        withHooks: false,
        withComponent: false,
        withHOC: false,
        withMutationFn: false,
        /** Apollo Client 4: `QueryResult` из пакета убран — не генерируем обёртку. */
        withResultType: false,
        /** Apollo Client 4: `BaseMutationOptions` отсутствует — не генерируем типы опций мутаций. */
        withMutationOptionsType: false,
        reactApolloVersion: 3,
      },
    },
  },
};

export default config;
