/** Реальный скролл в магазине — viewport Radix ScrollArea, а не сам `<main>`. */
export function findScrollContainer(
  from: HTMLElement | null,
): HTMLElement | null {
  let node: HTMLElement | null = from?.parentElement ?? null;
  while (node) {
    if (node.getAttribute('data-slot') === 'scroll-area-viewport') {
      return node;
    }
    const { overflowY } = getComputedStyle(node);
    if (
      (overflowY === 'auto' ||
        overflowY === 'scroll' ||
        overflowY === 'overlay') &&
      node.scrollHeight > node.clientHeight
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
}

/**
 * Viewport для Virtuoso `customScrollParent`: сначала предки с `data-slot`,
 * иначе тот же поиск, что у сохранения скролла страницы.
 */
export function resolveScrollAreaViewport(
  from: HTMLElement | null,
): HTMLElement | null {
  if (!from) {
    return null;
  }
  const byClosest = from.closest('[data-slot="scroll-area-viewport"]');
  if (byClosest instanceof HTMLElement) {
    return byClosest;
  }
  return findScrollContainer(from);
}
