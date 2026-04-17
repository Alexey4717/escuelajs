import { Fragment } from 'react';

import { type VariantProps } from 'class-variance-authority';

import { buttonGroupVariants } from './buttonGroupVariants';
import { ButtonGroupRoot } from './components/ButtonGroupRoot';
import { ButtonGroupSeparator } from './components/ButtonGroupSeparator';
import { ButtonGroupText } from './components/ButtonGroupText';
import type { ButtonGroupItem } from './types';

/**
 * Пропсы корневого компонента группы: атрибуты `div`, вариант {@link buttonGroupVariants orientation},
 * опционально декларативный массив {@link ButtonGroupItem items}.
 */
export type ButtonGroupProps = React.ComponentProps<'div'> &
  VariantProps<typeof buttonGroupVariants> & {
    /**
     * Декларативная сборка: сегменты `text`, `separator`, `custom`.
     * Если проп задан (включая пустой массив), `children` не рендерится.
     */
    items?: ButtonGroupItem[];
  };

function ButtonGroupConstructor({
  className,
  orientation,
  items,
  children,
  ...rest
}: ButtonGroupProps) {
  if (items !== undefined) {
    return (
      <ButtonGroupRoot
        className={className}
        orientation={orientation}
        {...rest}
      >
        {items.map((item, index) => {
          const key = index;
          switch (item.type) {
            case 'text':
              return (
                <ButtonGroupText
                  key={key}
                  asChild={item.asChild}
                  className={item.className}
                >
                  {item.children}
                </ButtonGroupText>
              );
            case 'separator':
              return (
                <ButtonGroupSeparator
                  key={key}
                  orientation={item.orientation}
                  className={item.className}
                />
              );
            case 'custom':
              return <Fragment key={key}>{item.children}</Fragment>;
          }
        })}
      </ButtonGroupRoot>
    );
  }

  return (
    <ButtonGroupRoot className={className} orientation={orientation} {...rest}>
      {children}
    </ButtonGroupRoot>
  );
}

/**
 * Группа связанных контролов с общей рамкой стыковки (скругления и границы между сегментами).
 *
 * **Режимы:** обычные `children`; или массив {@link ButtonGroupProps.items `items`} (тогда `children` не используются);
 * либо статические {@link ButtonGroup.Root}, {@link ButtonGroup.Text}, {@link ButtonGroup.Separator} для явной композиции.
 *
 * @example Композиция: `children` и подкомпоненты
 * ```tsx
 * import { Button } from '@/shared/ui/Button/Button';
 * import { ButtonGroup } from '@/shared/ui/ButtonGroup/ButtonGroup';
 *
 * <ButtonGroup orientation="horizontal">
 *   <Button variant="outline">Назад</Button>
 *   <ButtonGroup.Separator />
 *   <Button>Вперёд</Button>
 * </ButtonGroup>
 * ```
 *
 * @example Декларативно через `items`
 * ```tsx
 * import { ButtonGroup } from '@/shared/ui/ButtonGroup/ButtonGroup';
 *
 * <ButtonGroup
 *   orientation="vertical"
 *   items={[
 *     { type: 'text', children: 'Период' },
 *     { type: 'separator', orientation: 'horizontal' },
 *     { type: 'custom', children: <input className="flex-1 rounded-md border px-2" /> },
 *   ]}
 * />
 * ```
 *
 * @example Только подкомпоненты (без конструктора по `items`)
 * ```tsx
 * import { ButtonGroup } from '@/shared/ui/ButtonGroup/ButtonGroup';
 *
 * <ButtonGroup.Root>
 *   <ButtonGroup.Text>Filter</ButtonGroup.Text>
 *   <ButtonGroup.Separator />
 * </ButtonGroup.Root>
 * ```
 */
export const ButtonGroup = Object.assign(ButtonGroupConstructor, {
  Root: ButtonGroupRoot,
  Text: ButtonGroupText,
  Separator: ButtonGroupSeparator,
});
