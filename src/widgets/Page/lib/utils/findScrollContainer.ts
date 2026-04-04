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
