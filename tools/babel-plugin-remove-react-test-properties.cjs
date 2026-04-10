/**
 * Удаляет указанные JSX-атрибуты и одноимённые ключи в object literals (например `'data-testid'`).
 * Подключать только в production — см. `babel.config.js` (`env.production`).
 *
 * @param {import('@babel/core').ConfigAPI} _api
 * @param {{ props?: string[] }} [opts]
 * @returns {import('@babel/core').PluginObj}
 */
module.exports = function removeReactTestProperties(_api, opts) {
  const forbidden = opts?.props ?? ['data-testid'];

  return {
    name: 'remove-react-test-properties',
    visitor: {
      JSXAttribute(path) {
        const name = path.node.name;
        if (name.type === 'JSXIdentifier' && forbidden.includes(name.name)) {
          path.remove();
        }
      },
      ObjectProperty(path) {
        // Не трогаем object destructuring (например, props: {'data-testid': dataTestId})
        // Иначе можно удалить объявление переменной и получить ReferenceError в рантайме.
        if (path.parentPath?.isObjectPattern()) {
          return;
        }

        const key = path.node.key;
        if (key.type === 'StringLiteral' && forbidden.includes(key.value)) {
          path.remove();
          return;
        }
        if (key.type === 'Identifier' && forbidden.includes(key.name)) {
          path.remove();
        }
      },
    },
  };
};
