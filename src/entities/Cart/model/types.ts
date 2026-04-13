export type CartLineItem = {
  id: string;
  title: string;
  price: number;
  image: string;
};

export type CartState = {
  items: CartLineItem[];
  addItem: (item: CartLineItem) => void;
  removeItemByProductId: (productId: string) => void;
  toggleItem: (item: CartLineItem) => void;
  clearCart: () => void;
};
