/** @typedef {import('prettier').Config} PrettierConfig */

/** @type {PrettierConfig} */
const config = {
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  endOfLine: 'auto',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrderParserPlugins: ['typescript', 'jsx'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  importOrder: [
    '^react$',
    '^next(/.*)?$',
    '<THIRD_PARTY_MODULES>',
    '^(@/)?shared/(.*)$',
    '^(@/)?entities/(.*)$',
    '^(@/)?features/(.*)$',
    '^(@/)?widgets/(.*)$',
    '^(@/)?pages/(.*)$',
    '^[./]',
  ],
};

export default config;
