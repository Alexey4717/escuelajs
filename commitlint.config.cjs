/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // По умолчанию в conventional — 100; длинные англоязычные subjects уходят в ошибку.
    'header-max-length': [2, 'always', 150],
  },
  // Merge/revert из Git и semantic-release без conventional-тела
  ignores: [
    (message) => /^Merge\b/m.test(message.trim()),
    (message) => /^Revert\b/m.test(message.trim()),
  ],
};
