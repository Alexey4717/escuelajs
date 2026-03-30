/** @type {import('stylelint').Config} */
module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-tailwindcss',
    'stylelint-prettier/recommended',
  ],
  plugins: ['stylelint-use-logical'],
  rules: {
    'csstools/use-logical': 'always',
    // Tailwind / утилитарные классы и произвольные имена анимаций
    'selector-class-pattern': null,
    'keyframes-name-pattern': null,
    // Tailwind v4 + SCSS: @theme и др. — дублируем игноры из stylelint-config-tailwindcss для SCSS-правил
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'use',
          'forward',
          'theme',
          'source',
          'utility',
          'variant',
          'custom-variant',
          'plugin',
          'reference',
          'tailwind',
          'apply',
          'layer',
          'config',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
  },
  ignoreFiles: ['**/node_modules/**', '**/.next/**', '**/out/**', '**/dist/**', '**/build/**'],
};
