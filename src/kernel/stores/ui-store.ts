import { themeStorage } from '@kernel/storage';
import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';

type InfoDialogs = 'promoCodeInfo';
type InfoDialogStates = 'idle' | 'needShow' | 'shown';
interface UiState {
  theme: 'light' | 'dark';
  shownDialogs: {
    promoCodeInfo: InfoDialogStates;
  };
}

interface UiActions {
  setTheme: (theme: UiState['theme']) => void;

  setShownDialogs: (key: InfoDialogs, value: InfoDialogStates) => void;

}

export const useUiStore = create<UiState & UiActions>()(
  devtools(persist(subscribeWithSelector((set, get) => ({
    shownDialogs: {
      promoCodeInfo: 'idle',
    },
    theme: themeStorage.get() ?? 'light',

    setTheme: theme => set({ theme }),

    setShownDialogs: (key: InfoDialogs, value: InfoDialogStates) => set({ shownDialogs: { ...get().shownDialogs, [key]: value } }),
  }),
  ), {
    name: 'ui',
    partialize: state => ({
      shownDialogs: state.shownDialogs,
    }),
  }),
  ),
);
