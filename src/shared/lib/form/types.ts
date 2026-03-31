import type { ReactNode } from 'react';

import type { FieldValues, Path } from 'react-hook-form';

/**
 * Аргумент фабрики `createRHFTextField` в режиме с предзаданным полем.
 * Значения служат **дефолтами** для создаваемого компонента; `label`, `required` и
 * `data-testid` при необходимости можно переопределить в пропсах при рендере.
 *
 * @typeParam TForm — тип формы; ограничивает допустимые значения `name`.
 */
export type BaseFactoryArg<TForm extends FieldValues> = {
  /** Имя поля в форме; после создания фабрики передаётся в `name` нельзя — только здесь. */
  name: Path<TForm>;
  /** Текст подписи по умолчанию (для строки к обязательному полю добавляется ` *`). */
  label?: string;
  /** Обязательность по умолчанию (влияет на маркер в подписи). */
  required?: boolean;
  /** `data-testid` для нативного input по умолчанию. */
  'data-testid'?: string;
};

/**
 * Пункт списка для `createRHFSelect` (значения — строки, как в Radix Select).
 */
export type SelectOption<TValue extends string = string> = {
  label: ReactNode;
  value: TValue;
  disabled?: boolean;
  icon?: ReactNode;
};
