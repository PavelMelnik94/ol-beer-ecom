import { tokenStorage } from '@kernel/storage';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  isAuth: boolean;
}
interface AuthStore extends AuthState {
  setToken: (token: string | null) => void;
  clearToken: () => void;
}
export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      set => ({
        token: null,
        isAuth: false,
        setToken: (token) => {
          tokenStorage.set(token);
          set({ token, isAuth: !!token });
        },

        clearToken: () => {
          tokenStorage.remove();
          set({
            token: null,
            isAuth: false,
          });
        },

      }),
      {
        name: 'auth',
        partialize: state => ({
          isAuth: state.isAuth,
          token: state.token,
        }),
      },
    ),
  ),
);
