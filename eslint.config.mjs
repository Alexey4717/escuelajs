import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import vitest from 'eslint-plugin-vitest';
import { defineConfig, globalIgnores } from 'eslint/config';

/**
 * Порядок импортов задаётся только в prettier.config.mjs (@trivago/prettier-plugin-sort-imports).
 * eslint-plugin-prettier прогоняет Prettier как правило ESLint
 * дублировать import/order в обоих конфигах не нужно.
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  eslintPluginPrettierRecommended,
  {
    files: ['babel.config.js'],
    rules: {
      // Next.js принимает только babel.config.js (CommonJS); .mjs не поддерживается лоадером.
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: [
      '**/*.{test,spec}.{ts,tsx}',
      'src/test/**/*.{ts,tsx}',
      'e2e/**/*.ts',
    ],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
      'prettier/prettier': 'warn',
    },
  },
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    rules: {
      // recommended задаёт prettier/prettier: error — смягчаем до warning
      'prettier/prettier': 'warn',
      // Циклы по value-импортам. import type { … } правило намеренно не проверяет
      // (см. eslint-plugin-import no-cycle: return для importKind === 'type').
      'import/no-cycle': ['warn', { maxDepth: 50 }],
      'import/order': 'off',
    },
  },
  /**
   * eslint-plugin-prettier в IDE может отдавать ложные расхождения с Prettier CLI для
   * файлов, где работает @trivago/prettier-plugin-sort-imports (группы + пустые строки).
   * Формат тестов проверяйте `pnpm prettier:check` / pre-commit; здесь правило отключено.
   */
  {
    files: ['**/*.{test,spec}.{ts,tsx}', 'src/test/**/*.{ts,tsx}'],
    rules: {
      'prettier/prettier': 'off',
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    '**/*.generated.ts',
    'src/shared/api/generated/**',
  ]),
]);

export default eslintConfig;
