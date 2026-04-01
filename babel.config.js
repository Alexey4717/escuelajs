const path = require('node:path');

const removeTestProps = path.join(
  __dirname,
  'tools',
  'babel-plugin-remove-react-test-properties.cjs',
);

/**
 * При `next build` всегда `NODE_ENV=production`, поэтому отдельно от Vercel/CI
 * смотрим на KEEP_TEST_IDS: в CI для тестов выставляется `KEEP_TEST_IDS=1`, на Vercel
 * production эту переменную не задавайте — плагин вырежет `data-testid`.
 */
function productionPlugins() {
  const keep =
    process.env.KEEP_TEST_IDS === '1' ||
    /^true$/i.test(String(process.env.KEEP_TEST_IDS ?? ''));
  if (keep) {
    return [];
  }
  return [[removeTestProps, { props: ['data-testid'] }]];
}

/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: ['next/babel'],
  env: {
    production: {
      plugins: productionPlugins(),
    },
  },
};
