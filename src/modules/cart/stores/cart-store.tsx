import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface State {
  addedItemIds: Set<string>;
}

interface Actions {
  addItemId: (id: string) => void;
  removeItemId: (id: string) => void;
  clearItemIds: () => void;
  hasItemId: (id: string) => boolean;
}

const initialCommentsState: State = {
  addedItemIds: new Set<string>(),
};

export const useCartStore = create<State & Actions>()(
  subscribeWithSelector((set, get) => ({
    addedItemIds: initialCommentsState.addedItemIds,
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

  })),
);
