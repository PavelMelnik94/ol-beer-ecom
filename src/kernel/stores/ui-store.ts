import { themeStorage } from '@kernel/storage';
import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

interface UiState {
  theme: 'light' | 'dark';
}

interface UiActions {
  setTheme: (theme: UiState['theme']) => void;
}

export const useUiStore = create<UiState & UiActions>()(
  devtools(
    subscribeWithSelector((set
    ) => ({
      theme: themeStorage.get() ?? 'light',


      setTheme: theme => set({ theme }),

    }),
   )  ));
