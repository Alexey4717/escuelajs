/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  // Merge/revert из Git и semantic-release без conventional-тела
  ignores: [
    (message) => /^Merge\b/m.test(message.trim()),
    (message) => /^Revert\b/m.test(message.trim()),
  ],
};
