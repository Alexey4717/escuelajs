import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
      src: path.resolve(process.cwd(), 'src'),
    },
    // ApolloNextAppProvider: браузерная сборка `@apollo/client-integration-nextjs` (см. package exports `browser`).
    conditions: ['browser', 'development', 'module', 'import', 'default'],
  },
  test: {
    include: ['src/**/*.{test,spec}.{ts,tsx}', 'src/**/*.node.test.ts'],
    globals: false,
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        url: 'http://localhost:3000/',
      },
    },
    setupFiles: ['./src/test/setup/vitest-setup.ts'],
    server: {
      deps: {
        inline: [
          '@apollo/client',
          '@apollo/client-integration-nextjs',
          '@apollo/client/react',
        ],
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
});
