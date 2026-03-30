import type { NextConfig } from 'next';

import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  reactStrictMode: true, // Может конфликтовать со старыми библиотеками
  poweredByHeader: false, // чтоб человек не смог обнаружить, на каком фреймворке написано приложение
  reactCompiler: true,
};

export default withBundleAnalyzer(nextConfig);
