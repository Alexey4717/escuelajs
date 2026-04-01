import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Configuration for eslint-plugin-import
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    rules: {
      // Циклы по value-импортам. import type { … } правило намеренно не проверяет
      // (см. eslint-plugin-import no-cycle: return для importKind === 'type').
      'import/no-cycle': ['error', { maxDepth: 50 }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
]);

export default eslintConfig;
