import type { NextConfig } from 'next';

import bundleAnalyzer from '@next/bundle-analyzer';
import path from 'node:path';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  reactStrictMode: true, // Может конфликтовать со старыми библиотеками
  poweredByHeader: false, // чтоб человек не смог обнаружить, на каком фреймворке написано приложение
  reactCompiler: true,
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src')],
  },
  // Apollo Client: production — подстановка globalThis.__DEV__ = false
  // https://www.apollographql.com/docs/react/development-testing/reducing-bundle-size
  ...(process.env.NODE_ENV === 'production'
    ? {
        compiler: {
          define: {
            'globalThis.__DEV__': 'false',
          },
        },
      }
    : {}),
};

export default withBundleAnalyzer(nextConfig);
