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
};

export default withBundleAnalyzer(nextConfig);
