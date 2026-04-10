'use client';

import { CollapsibleContent } from './components/CollapsibleContent';
import { CollapsibleRoot } from './components/CollapsibleRoot';
import { CollapsibleTrigger } from './components/CollapsibleTrigger';
import type { CollapsibleProps } from './types';

/**
 * Раскрывающийся блок на базе [Radix Collapsible](https://www.radix-ui.com/primitives/docs/components/collapsible).
 * Наследует пропсы корня (`open` / `onOpenChange`, `defaultOpen` и т.д.).
 *
 * Если заданы **оба** `trigger` и `content`, внутри рендерятся `CollapsibleTrigger` и `CollapsibleContent`
 * без ручной вложенности. Иначе передайте разметку через `children` (обычно пара триггер + контент из этого же набора компонентов).
 *
 * @example Упрощённый API — только корневой импорт
 * ```tsx
 * import { Collapsible } from '@/shared/ui/Collapsible/Collapsible';
 *
 * export function FaqItem() {
 *   return (
 *     <Collapsible
 *       defaultOpen
 *       trigger={<span className="font-medium">Вопрос</span>}
 *       content={<p className="text-muted-foreground">Ответ</p>}
 *     />
 *   );
 * }
 * ```
 *
 * @example Составной API — полный контроль разметки
 * ```tsx
 * import { Collapsible } from '@/shared/ui/Collapsible/Collapsible';
 * import { CollapsibleContent } from '@/shared/ui/Collapsible/components/CollapsibleContent';
 * import { CollapsibleTrigger } from '@/shared/ui/Collapsible/components/CollapsibleTrigger';
 *
 * export function FaqItem() {
 *   return (
 *     <Collapsible defaultOpen>
 *       <CollapsibleTrigger>Вопрос</CollapsibleTrigger>
 *       <CollapsibleContent>
 *         <p className="text-muted-foreground">Ответ</p>
 *       </CollapsibleContent>
 *     </Collapsible>
 *   );
 * }
 * ```
 *
 * @example Только примитивы — без обёртки `Collapsible`
 * ```tsx
 * import { CollapsibleContent } from '@/shared/ui/Collapsible/components/CollapsibleContent';
 * import { CollapsibleRoot } from '@/shared/ui/Collapsible/components/CollapsibleRoot';
 * import { CollapsibleTrigger } from '@/shared/ui/Collapsible/components/CollapsibleTrigger';
 *
 * export function Panel() {
 *   return (
 *     <CollapsibleRoot defaultOpen>
 *       <CollapsibleTrigger>Секция</CollapsibleTrigger>
 *       <CollapsibleContent>Содержимое</CollapsibleContent>
 *     </CollapsibleRoot>
 *   );
 * }
 * ```
 */
export const Collapsible = ({
  className,
  trigger,
  content,
  children,
  ...rootProps
}: CollapsibleProps) => {
  const simplified = trigger !== undefined && content !== undefined;

  return (
    <CollapsibleRoot className={className} {...rootProps}>
      {simplified ? (
        <>
          <CollapsibleTrigger>{trigger}</CollapsibleTrigger>
          <CollapsibleContent>{content}</CollapsibleContent>
        </>
      ) : (
        children
      )}
    </CollapsibleRoot>
  );
};
