import type { FieldPolicy } from '@apollo/client';

/**
 * Пагинация для плоского списка с аргументами `first` + `after` (без Relay Connection).
 * Дополняет `relayStylePagination` из `@apollo/client/utilities`, когда API отдаёт `[T!]!`, а не edges/pageInfo.
 */
export function cursorLimitPagination(
  keyArgs: string[] | false = false,
): FieldPolicy {
  return {
    keyArgs,
    merge(
      existing: unknown[] | undefined,
      incoming: unknown[] | undefined,
      { args },
    ) {
      const merged = existing ? existing.slice(0) : [];
      if (!incoming?.length) return merged;
      if (args && typeof args.after === 'string' && args.after !== '') {
        merged.push(...incoming);
        return merged;
      }
      return incoming.slice(0);
    },
  };
}
