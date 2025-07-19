import type { CartItem } from '@modules/cart/types';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface State {
  addedItemIds: Set<string>;
  orders?: CartItem[] | [];
}

interface Actions {
  addItemId: (id: string) => void;
  removeItemId: (id: string) => void;
  clearItemIds: () => void;
  hasItemId: (id: string) => boolean;

  setOrders: (items: CartItem[] | []) => void;
  getOrderIdByProductId: (productId: string) => string | undefined;
}

const initialCommentsState: State = {
  addedItemIds: new Set<string>(),
  orders: [],
};

export const useCartStore = create<State & Actions>()(
  subscribeWithSelector((set, get) => ({
    addedItemIds: initialCommentsState.addedItemIds,
    ordersIds: initialCommentsState.orders,
    addItemId: (id: string) => {
      const currentIds = get().addedItemIds;
      currentIds.add(id);
      set({ addedItemIds: new Set(currentIds) });
    },
    removeItemId: (id: string) => {
      const currentIds = get().addedItemIds;
      currentIds.delete(id);
      set({ addedItemIds: new Set(currentIds) });
    },
    clearItemIds: () => set({ addedItemIds: new Set([]) }),
    hasItemId: (id: string) => get().addedItemIds.has(id),

    setOrders: (items: CartItem[]) => set({ orders: items }),
    getOrderIdByProductId: (productId: string) => {
      const orders = get().orders;
      if (!orders) return;
      const order = [...orders].find(order => order.product.id === productId);
      return order?.id;
    },
  })),
);
