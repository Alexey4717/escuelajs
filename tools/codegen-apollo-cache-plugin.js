'use strict';

/**
 * Плагин GraphQL Codegen: генерирует политики кеша Apollo
 * (offset/cursor пагинация и не-нормализованные типы).
 *
 * Схема escuelajs: offset-пагинация через `limit` + `offset` (см. offsetLimitPagination в Apollo).
 * Дополнительно поддерживается пара `first` + `offset` и cursor `after` + `first`.
 *
 * @see codegen.ts — отдельный generates для apolloCachePolicies.ts
 */

/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires -- Node-скрипт кодогена */
/* eslint-disable no-console -- плагин кодогена */
const {
  getNamedType,
  getNullableType,
  isListType,
  isObjectType,
  Kind,
} = require('graphql');

const PAGINATION_ARGS_CURSOR = ['after', 'first'];
/** Имена переменных операции, которые не участвуют в keyArgs (пагинация). */
const OP_VAR_EXCLUDE = new Set(['limit', 'offset', 'first', 'after']);
const ROOT_TYPES_TO_SKIP = new Set(['Query', 'Mutation', 'Subscription']);
const LOG_PREFIX = '[codegen-apollo-cache-plugin]';

/**
 * @param {string[]} argNames
 * @returns {{ exclude: string[] } | null}
 */
function getOffsetPaginationPair(argNames) {
  if (argNames.includes('offset') && argNames.includes('limit')) {
    return { exclude: ['offset', 'limit'] };
  }
  if (argNames.includes('offset') && argNames.includes('first')) {
    return { exclude: ['offset', 'first'] };
  }
  return null;
}

/**
 * @param {import('graphql').GraphQLSchema} schema
 * @returns {{ name: string, field: import('graphql').GraphQLField<unknown, unknown> }[]}
 */
function getQueryFields(schema) {
  const queryType = schema.getQueryType();
  if (!queryType || !isObjectType(queryType)) return [];
  const fields = queryType.getFields();
  return Object.entries(fields).map(([name, field]) => ({ name, field }));
}

/**
 * @param {import('graphql').GraphQLField<unknown, unknown>} field
 * @returns {string[]}
 */
function getArgNames(field) {
  return (field.args ?? []).map((a) => a.name);
}

/**
 * @param {string[]} argNames
 * @param {'offset' | 'cursor'} kind
 * @returns {boolean}
 */
function hasPaginationArgs(argNames, kind) {
  if (kind === 'offset') return getOffsetPaginationPair(argNames) !== null;
  return PAGINATION_ARGS_CURSOR.every((arg) => argNames.includes(arg));
}

/**
 * @param {{ document: import('graphql').DocumentNode }[]} documents
 * @returns {Map<string, Set<string>>}
 */
function collectRootFieldArgNamesFromDocuments(documents) {
  const fieldToArgNames = new Map();

  for (const { document } of documents) {
    for (const def of document.definitions) {
      if (def.kind !== Kind.OPERATION_DEFINITION) continue;
      const op = def;
      if (op.operation !== 'query') continue;
      const rootSelections = op.selectionSet?.selections ?? [];
      const operationVarNames = new Set(
        (op.variableDefinitions ?? [])
          .map((v) => v.variable.name.value)
          .filter((n) => !OP_VAR_EXCLUDE.has(n)),
      );
      for (const sel of rootSelections) {
        if (sel.kind !== Kind.FIELD) continue;
        const fieldName = sel.name.value;
        let set = fieldToArgNames.get(fieldName);
        if (!set) {
          set = new Set();
          fieldToArgNames.set(fieldName, set);
        }
        for (const arg of sel.arguments ?? []) {
          set.add(arg.name.value);
        }
        for (const v of operationVarNames) {
          set.add(v);
        }
      }
    }
  }
  return fieldToArgNames;
}

/** @param {{ document: import('graphql').DocumentNode }[]} documents */
function getUsedRootFieldNames(documents) {
  return new Set(collectRootFieldArgNamesFromDocuments(documents).keys());
}

const NESTED_FIELD_KIND_OFFSET = 'offset';
const NESTED_FIELD_KIND_CURSOR = 'cursor';
const NESTED_FIELD_KIND_KEY_ARGS = 'keyArgs';

/**
 * @param {import('graphql').GraphQLSchema} schema
 * @param {{ document: import('graphql').DocumentNode }[]} documents
 */
function collectNestedPaginatedFromDocuments(schema, documents) {
  const nestedByType = new Map();
  const typesUsedInDocuments = new Set();

  const keyArgsByKey = new Map();

  function keyArgsKey(typeName, fieldName, kind) {
    return `${typeName}\0${fieldName}\0${kind}`;
  }

  function addNested(
    typeName,
    fieldName,
    kind,
    schemaKeyArgs,
    operationVarNames,
    fieldArgNamesForExclude,
  ) {
    const key = keyArgsKey(typeName, fieldName, kind);
    let set = keyArgsByKey.get(key);
    if (!set) {
      set = new Set(schemaKeyArgs);
      keyArgsByKey.set(key, set);
    }
    for (const n of schemaKeyArgs) set.add(n);
    if (operationVarNames && kind !== NESTED_FIELD_KIND_KEY_ARGS) {
      const offsetPair = fieldArgNamesForExclude
        ? getOffsetPaginationPair(fieldArgNamesForExclude)
        : null;
      for (const n of operationVarNames) {
        if (kind === NESTED_FIELD_KIND_OFFSET) {
          const exclude = offsetPair ? offsetPair.exclude : ['limit', 'offset'];
          if (!exclude.includes(n)) set.add(n);
        }
        if (
          kind === NESTED_FIELD_KIND_CURSOR &&
          !PAGINATION_ARGS_CURSOR.includes(n)
        )
          set.add(n);
      }
    }
  }

  function finalizeNested() {
    const seen = new Set();
    for (const [key, keyArgsSet] of keyArgsByKey) {
      const [typeName, fieldName, kind] = key.split('\0');
      const keyArgs = Array.from(keyArgsSet).sort();
      const listKey = `${typeName}\0${fieldName}\0${kind}`;
      if (seen.has(listKey)) continue;
      seen.add(listKey);
      let list = nestedByType.get(typeName);
      if (!list) {
        list = [];
        nestedByType.set(typeName, list);
      }
      list.push({ fieldName, kind, keyArgs });
    }
  }

  const fragmentMap = new Map();
  for (const { document } of documents) {
    for (const def of document.definitions) {
      if (def.kind === Kind.FRAGMENT_DEFINITION) {
        fragmentMap.set(def.name.value, def);
      }
    }
  }

  function visitSelectionSet(selectionSet, parentType, operationVarNames) {
    if (!selectionSet || !parentType || !isObjectType(parentType)) return;
    typesUsedInDocuments.add(parentType.name);
    const fields = parentType.getFields();

    for (const sel of selectionSet.selections) {
      if (sel.kind === Kind.FIELD) {
        const fieldName = sel.name.value;
        const field = fields[fieldName];
        if (!field) continue;
        const argNames = (field.args ?? []).map((a) => a.name);
        const offsetPair = getOffsetPaginationPair(argNames);
        if (offsetPair) {
          const schemaKeyArgs = argNames
            .filter((n) => !offsetPair.exclude.includes(n))
            .sort();
          addNested(
            parentType.name,
            fieldName,
            NESTED_FIELD_KIND_OFFSET,
            schemaKeyArgs,
            operationVarNames,
            argNames,
          );
        }
        if (hasPaginationArgs(argNames, 'cursor')) {
          const schemaKeyArgs = argNames
            .filter((n) => !PAGINATION_ARGS_CURSOR.includes(n))
            .sort();
          addNested(
            parentType.name,
            fieldName,
            NESTED_FIELD_KIND_CURSOR,
            schemaKeyArgs,
            operationVarNames,
            argNames,
          );
        }
        if (
          argNames.length > 0 &&
          !offsetPair &&
          !hasPaginationArgs(argNames, 'cursor')
        ) {
          addNested(
            parentType.name,
            fieldName,
            NESTED_FIELD_KIND_KEY_ARGS,
            argNames.slice().sort(),
            null,
            argNames,
          );
        }
        const namedType = getNamedType(field.type);
        if (isObjectType(namedType) && sel.selectionSet) {
          visitSelectionSet(sel.selectionSet, namedType, operationVarNames);
        }
      } else if (sel.kind === Kind.FRAGMENT_SPREAD) {
        const frag = fragmentMap.get(sel.name.value);
        if (frag && frag.typeCondition) {
          const typeCond = schema.getType(frag.typeCondition.name.value);
          if (isObjectType(typeCond) && frag.selectionSet) {
            visitSelectionSet(frag.selectionSet, typeCond, operationVarNames);
          }
        }
      } else if (sel.kind === Kind.INLINE_FRAGMENT && sel.selectionSet) {
        const typeCond = sel.typeCondition
          ? schema.getType(sel.typeCondition.name.value)
          : parentType;
        if (isObjectType(typeCond)) {
          visitSelectionSet(sel.selectionSet, typeCond, operationVarNames);
        }
      }
    }
  }

  const queryType = schema.getQueryType();
  if (!queryType || !isObjectType(queryType))
    return { nestedByType, typesUsedInDocuments };

  for (const { document } of documents) {
    for (const def of document.definitions) {
      if (
        def.kind === Kind.OPERATION_DEFINITION &&
        def.operation === 'query' &&
        def.selectionSet
      ) {
        const op = def;
        const operationVarNames = new Set(
          (op.variableDefinitions ?? [])
            .map((v) => v.variable.name.value)
            .filter((n) => !OP_VAR_EXCLUDE.has(n)),
        );
        visitSelectionSet(def.selectionSet, queryType, operationVarNames);
      }
    }
  }

  finalizeNested();
  return { nestedByType, typesUsedInDocuments };
}

/**
 * @param {string[]} schemaArgNames
 * @param {Set<string> | undefined} documentArgNames
 * @param {'offset' | 'cursor'} kind
 * @returns {string[]}
 */
function mergedKeyArgsForPagination(schemaArgNames, documentArgNames, kind) {
  const exclude =
    kind === 'offset'
      ? (getOffsetPaginationPair(schemaArgNames)?.exclude ?? [
          'limit',
          'offset',
        ])
      : PAGINATION_ARGS_CURSOR;
  const fromSchema = new Set(
    schemaArgNames.filter((n) => !exclude.includes(n)),
  );
  if (documentArgNames) {
    for (const n of Array.from(documentArgNames)) {
      if (!exclude.includes(n)) fromSchema.add(n);
    }
  }
  return Array.from(fromSchema).sort();
}

/**
 * Все аргументы поля участвуют в keyArgs (например `users(limit)` без offset — отдельный ключ на каждый набор аргументов).
 * @param {string[]} schemaArgNames
 * @param {Set<string> | undefined} documentArgNames
 * @returns {string[]}
 */
function mergedKeyArgsForArgfulListField(schemaArgNames, documentArgNames) {
  const fromSchema = new Set(schemaArgNames);
  if (documentArgNames) {
    for (const n of documentArgNames) fromSchema.add(n);
  }
  return Array.from(fromSchema).sort();
}

/**
 * @param {import('graphql').GraphQLSchema} schema
 * @returns {string[]}
 */
function getNonNormalizedTypes(schema) {
  const typeMap = schema.getTypeMap();
  const result = [];
  for (const [typeName, type] of Object.entries(typeMap)) {
    if (typeName.startsWith('__')) continue;
    if (ROOT_TYPES_TO_SKIP.has(typeName)) continue;
    if (!isObjectType(type)) continue;
    const fields = type.getFields();
    if (fields['id']) continue;
    result.push(typeName);
  }
  return result;
}

function getRootNonNormalizedQueryFields(
  schema,
  nonNormalizedSet,
  offsetLimitFieldNames,
  cursorLimitFieldNames,
  usedRootFieldNames,
) {
  const paginatedSet = new Set([
    ...offsetLimitFieldNames,
    ...cursorLimitFieldNames,
  ]);
  const queryFields = getQueryFields(schema);
  const result = [];
  for (const { name, field } of queryFields) {
    if (usedRootFieldNames && !usedRootFieldNames.has(name)) continue;
    if (paginatedSet.has(name)) continue;
    const namedType = getNamedType(field.type);
    if (!isObjectType(namedType)) continue;
    if (!nonNormalizedSet.has(namedType.name)) continue;
    if (isListType(getNullableType(field.type))) continue;
    result.push({
      fieldName: name,
      keyArgs: getArgNames(field).sort(),
    });
  }
  return result;
}

function getRootNonNormalizedQueryFieldsReturningLists(
  schema,
  nonNormalizedSet,
  offsetLimitFieldNames,
  cursorLimitFieldNames,
  usedRootFieldNames,
) {
  const paginatedSet = new Set([
    ...offsetLimitFieldNames,
    ...cursorLimitFieldNames,
  ]);
  const queryFields = getQueryFields(schema);
  const result = [];
  for (const { name, field } of queryFields) {
    if (usedRootFieldNames && !usedRootFieldNames.has(name)) continue;
    if (paginatedSet.has(name)) continue;
    if (!isListType(getNullableType(field.type))) continue;
    const namedType = getNamedType(field.type);
    if (!isObjectType(namedType)) continue;
    if (!nonNormalizedSet.has(namedType.name)) continue;
    result.push({
      fieldName: name,
      keyArgs: getArgNames(field).sort(),
    });
  }
  return result;
}

function generateOffsetLimitPolicies(
  schema,
  documentArgNamesByField,
  usedRootFieldNames,
) {
  const entries = [];
  for (const { name, field } of getQueryFields(schema)) {
    if (!usedRootFieldNames.has(name)) continue;
    const argNames = getArgNames(field);
    if (!hasPaginationArgs(argNames, 'offset')) continue;
    const keyArgs = mergedKeyArgsForPagination(
      argNames,
      documentArgNamesByField.get(name),
      'offset',
    );
    entries.push(
      `  ${name}: offsetLimitPagination(${JSON.stringify(keyArgs)}),`,
    );
  }
  if (entries.length === 0) return '';
  return [
    '/** Сгенерировано codegen-apollo-cache-plugin. Не редактировать вручную. */',
    'export const arraysPoliciesByOffsetLimit = {',
    ...entries,
    '} as const;',
    '',
  ].join('\n');
}

function generateCursorLimitPolicies(
  schema,
  documentArgNamesByField,
  usedRootFieldNames,
) {
  const entries = [];
  for (const { name, field } of getQueryFields(schema)) {
    if (!usedRootFieldNames.has(name)) continue;
    const argNames = getArgNames(field);
    if (!hasPaginationArgs(argNames, 'cursor')) continue;
    const keyArgs = mergedKeyArgsForPagination(
      argNames,
      documentArgNamesByField.get(name),
      'cursor',
    );
    entries.push(
      `  ${name}: cursorLimitPagination(${JSON.stringify(keyArgs)}),`,
    );
  }
  if (entries.length === 0) return '';
  return [
    '/** Сгенерировано codegen-apollo-cache-plugin. Не редактировать вручную. */',
    'export const arraysPoliciesByCursorLimit = {',
    ...entries,
    '} as const;',
    '',
  ].join('\n');
}

function getOffsetLimitFieldNames(schema) {
  return getQueryFields(schema)
    .filter(({ field }) => hasPaginationArgs(getArgNames(field), 'offset'))
    .map(({ name }) => name);
}

function getCursorLimitFieldNames(schema) {
  return getQueryFields(schema)
    .filter(({ field }) => hasPaginationArgs(getArgNames(field), 'cursor'))
    .map(({ name }) => name);
}

/**
 * Корневые поля Query: список с аргументами, но не offset/limit-страницы и не cursor.
 * (Например `users(limit)` у Escuela API — без `offset` нельзя применить offsetLimitPagination.)
 * @param {import('graphql').GraphQLSchema} schema
 * @param {Map<string, Set<string>>} documentArgNamesByField
 * @param {Set<string>} usedRootFieldNames
 * @returns {string}
 */
function generateQueryListFieldsWithKeyArgs(
  schema,
  documentArgNamesByField,
  usedRootFieldNames,
) {
  const nonNormalized = getNonNormalizedTypes(schema);
  const nonNormalizedSet = new Set(nonNormalized);
  const offsetNames = getOffsetLimitFieldNames(schema).filter((n) =>
    usedRootFieldNames.has(n),
  );
  const cursorNames = getCursorLimitFieldNames(schema).filter((n) =>
    usedRootFieldNames.has(n),
  );
  const nonNormArrayFieldNames = new Set(
    getRootNonNormalizedQueryFieldsReturningLists(
      schema,
      nonNormalizedSet,
      offsetNames,
      cursorNames,
      usedRootFieldNames,
    ).map(({ fieldName }) => fieldName),
  );

  const entries = [];
  for (const { name, field } of getQueryFields(schema)) {
    if (!usedRootFieldNames.has(name)) continue;
    const argNames = getArgNames(field);
    if (argNames.length === 0) continue;
    if (getOffsetPaginationPair(argNames)) continue;
    if (hasPaginationArgs(argNames, 'cursor')) continue;
    if (!isListType(getNullableType(field.type))) continue;
    if (nonNormArrayFieldNames.has(name)) continue;
    const keyArgs = mergedKeyArgsForArgfulListField(
      argNames,
      documentArgNamesByField.get(name),
    );
    entries.push(`  ${name}: { keyArgs: ${JSON.stringify(keyArgs)} },`);
  }

  if (entries.length === 0) {
    return (
      '/** Нет корневых полей Query: список с аргументами без offset/cursor-пагинации. */\n' +
      'export const queryListFieldsWithKeyArgs = {} as const;\n'
    );
  }

  return [
    '/** Списки на Query с аргументами, не offset/cursor (явные keyArgs). Сгенерировано codegen-apollo-cache-plugin. */',
    'export const queryListFieldsWithKeyArgs = {',
    ...entries,
    '} as const;',
    '',
  ].join('\n');
}

function generateNonNormalizedPolicies(schema, usedRootFieldNames) {
  const nonNormalized = getNonNormalizedTypes(schema);
  const nonNormalizedSet = new Set(nonNormalized);
  const offsetNames = getOffsetLimitFieldNames(schema).filter((n) =>
    usedRootFieldNames.has(n),
  );
  const cursorNames = getCursorLimitFieldNames(schema).filter((n) =>
    usedRootFieldNames.has(n),
  );

  const rootFields = getRootNonNormalizedQueryFields(
    schema,
    nonNormalizedSet,
    offsetNames,
    cursorNames,
    usedRootFieldNames,
  );
  const rootArrayFields = getRootNonNormalizedQueryFieldsReturningLists(
    schema,
    nonNormalizedSet,
    offsetNames,
    cursorNames,
    usedRootFieldNames,
  );

  const queryFieldsEntries = rootFields.map(
    ({ fieldName, keyArgs }) =>
      `  ${fieldName}: { keyArgs: ${JSON.stringify(keyArgs)}, merge: true },`,
  );
  const arrayQueryFieldsEntries = rootArrayFields.map(
    ({ fieldName, keyArgs }) =>
      `  ${fieldName}: { keyArgs: ${JSON.stringify(keyArgs)}, merge(_existing: unknown, incoming: unknown) { return incoming; } },`,
  );

  const parts = [];
  if (queryFieldsEntries.length > 0) {
    parts.push(
      '/** Поля Query, возвращающие одиночную не-нормализованную сущность. Сгенерировано codegen-apollo-cache-plugin. */',
      'export const nonNormalizedQueryFields = {',
      ...queryFieldsEntries,
      '} as const;',
      '',
    );
  } else {
    parts.push(
      '/** Нет полей Query с одиночной не-нормализованной сущностью. */',
      'export const nonNormalizedQueryFields = {} as const;',
      '',
    );
  }

  if (arrayQueryFieldsEntries.length > 0) {
    parts.push(
      '/** Поля Query, возвращающие массив не-нормализованного типа (без пагинации): merge = замена входящим. Сгенерировано codegen-apollo-cache-plugin. */',
      'export const nonNormalizedArrayQueryFields = {',
      ...arrayQueryFieldsEntries,
      '} as const;',
      '',
    );
  } else {
    parts.push(
      '/** Нет полей Query с массивом не-нормализованного типа без пагинации. */',
      'export const nonNormalizedArrayQueryFields = {} as const;',
      '',
    );
  }

  return parts.join('\n');
}

function generateTypePoliciesByType(schema, documents) {
  const { nestedByType, typesUsedInDocuments } =
    collectNestedPaginatedFromDocuments(schema, documents);
  const nonNormalizedSet = new Set(getNonNormalizedTypes(schema));

  const allTypeNames = new Set(Array.from(typesUsedInDocuments));
  for (const typeName of Array.from(nestedByType.keys())) {
    allTypeNames.add(typeName);
  }

  const typeEntries = [];

  for (const typeName of Array.from(allTypeNames).sort()) {
    if (ROOT_TYPES_TO_SKIP.has(typeName)) continue;
    if (!typesUsedInDocuments.has(typeName) && !nestedByType.has(typeName))
      continue;
    const hasMerge =
      nonNormalizedSet.has(typeName) && typesUsedInDocuments.has(typeName);
    const nestedFields = nestedByType.get(typeName) ?? [];

    const fieldEntries = [];
    for (const { fieldName, kind, keyArgs } of nestedFields) {
      const keyArgsStr = JSON.stringify(keyArgs);
      if (kind === NESTED_FIELD_KIND_OFFSET) {
        fieldEntries.push(
          `    ${fieldName}: offsetLimitPagination(${keyArgsStr}),`,
        );
      } else if (kind === NESTED_FIELD_KIND_CURSOR) {
        fieldEntries.push(
          `    ${fieldName}: cursorLimitPagination(${keyArgsStr}),`,
        );
      } else if (kind === NESTED_FIELD_KIND_KEY_ARGS) {
        fieldEntries.push(`    ${fieldName}: { keyArgs: ${keyArgsStr} },`);
      }
    }

    if (!hasMerge && fieldEntries.length === 0) continue;
    const parts = [];
    if (hasMerge) parts.push('merge: true');
    if (fieldEntries.length > 0) {
      parts.push(`fields: {\n${fieldEntries.join('\n')}\n  }`);
    }
    typeEntries.push(`  ${typeName}: { ${parts.join(', ')} },`);
  }

  if (typeEntries.length === 0) {
    return (
      '/** Нет типов с merge или вложенной пагинацией. */\n' +
      'export const typePoliciesByType = {} as const;\n'
    );
  }

  return [
    '/** Типы: merge для не-нормализованных + вложенные поля (пагинация и keyArgs для полей с аргументами). Сгенерировано codegen-apollo-cache-plugin. */',
    'export const typePoliciesByType = {',
    ...typeEntries,
    '} as const;',
    '',
  ].join('\n');
}

function generateFullOutput(schema, documents) {
  const documentArgNamesByField =
    collectRootFieldArgNamesFromDocuments(documents);
  const usedRootFieldNames = getUsedRootFieldNames(documents);

  const offsetBlock = generateOffsetLimitPolicies(
    schema,
    documentArgNamesByField,
    usedRootFieldNames,
  );
  const cursorBlock = generateCursorLimitPolicies(
    schema,
    documentArgNamesByField,
    usedRootFieldNames,
  );
  const queryListKeyArgsBlock = generateQueryListFieldsWithKeyArgs(
    schema,
    documentArgNamesByField,
    usedRootFieldNames,
  );
  const nonNormBlock = generateNonNormalizedPolicies(
    schema,
    usedRootFieldNames,
  );
  const typePoliciesBlock = generateTypePoliciesByType(schema, documents);

  const lines = [
    '/**',
    ' * Политики кеша Apollo: сгенерировано codegen-apollo-cache-plugin',
    ' * в одном флоу с codegen (те же schema и documents). Не редактировать вручную.',
    ' */',
    '',
    "import { offsetLimitPagination } from '@apollo/client/utilities';",
  ];

  const needsCursorImport =
    cursorBlock.length > 0 ||
    typePoliciesBlock.includes('cursorLimitPagination(');
  if (needsCursorImport) {
    lines.push(
      `import { cursorLimitPagination } from '../../lib/apollo/cache/cursorLimitPagination';`,
    );
  }
  lines.push('');

  if (offsetBlock) {
    lines.push(offsetBlock, '');
  } else {
    lines.push(
      '/** Нет полей Query с offset/limit пагинацией. */',
      'export const arraysPoliciesByOffsetLimit = {} as const;',
      '',
    );
  }
  if (cursorBlock) {
    lines.push(cursorBlock, '');
  } else {
    lines.push(
      '/** Нет полей Query с cursor пагинацией. */',
      'export const arraysPoliciesByCursorLimit = {} as const;',
      '',
    );
  }

  lines.push(queryListKeyArgsBlock, '');
  lines.push(nonNormBlock, '');
  lines.push(typePoliciesBlock);

  return lines.join('\n');
}

/**
 * @param {import('graphql').GraphQLSchema} schema
 * @param {unknown} documents
 * @param {Record<string, unknown>} [_config]
 * @param {{ outputFile?: string }} [_info]
 * @returns {string}
 */
function plugin(schema, documents, _config, _info) {
  const docs = Array.isArray(documents) ? documents : [];

  console.log(`${LOG_PREFIX} STARTED (schema + ${docs.length} documents)`);

  const content = generateFullOutput(schema, docs);

  const offsetCount = (content.match(/offsetLimitPagination/g) ?? []).length;
  const cursorCount = (content.match(/cursorLimitPagination/g) ?? []).length;

  console.log(
    `${LOG_PREFIX} GENERATED: fields offset=${offsetCount}, cursor=${cursorCount}`,
  );
  console.log(`${LOG_PREFIX} FINISHED`);

  return content;
}

module.exports = { plugin };
