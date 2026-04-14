/** Структурно совместимо с `CartLineItem` из entities без импорта entity в shared. */
export type CartFlyLineItem = {
  id: string;
  title: string;
  price: number;
  image: string;
};

export type CartFlyContextValue = {
  registerCartFlyTarget: (element: HTMLElement | null) => void;
  scheduleAddWithFly: (
    item: CartFlyLineItem,
    getSourceElement: () => HTMLElement | null,
  ) => void;
  /** true только для товара, который уже «в полёте». */
  isFlightInProgress: (productId: string) => boolean;
};
