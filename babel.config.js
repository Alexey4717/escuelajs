const path = require('node:path');

const removeTestProps = path.join(
  __dirname,
  'tools',
  'babel-plugin-remove-react-test-properties.cjs',
);

/**
 * При `next build` всегда `NODE_ENV=production` — как на Vercel: плагин вырезает
 * `data-testid` из продакшен-бандла. Локально и в E2E против `pnpm dev` атрибуты остаются.
 */

/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: ['next/babel'],
  env: {
    production: {
      plugins: [[removeTestProps, { props: ['data-testid'] }]],
    },
  },
};
