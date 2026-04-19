const pad2 = (n: number) => String(n).padStart(2, '0');

/**
 * Парсит дату из ISO-строки, числа (timestamp) или объекта Date
 * и возвращает строку в формате «dd.MM.yyyy HH:mm» (локальное время браузера).
 */
export const formatDateTime = (
  value?: string | number | Date | null,
): string => {
  if (value === null || value === undefined || value === '') {
    return '';
  }

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return `${pad2(date.getDate())}.${pad2(date.getMonth() + 1)}.${date.getFullYear()} ${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
};
