import { tokenStorage } from '@kernel/storage';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface AuthState {
  token: string | undefined;
  isAuth: boolean;
}
interface AuthStore extends AuthState {
  setToken: (token: string | undefined) => void;
  clearToken: () => void;
}
export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      set => ({
        token: undefined,
        isAuth: false,
        setToken: (token) => {
          tokenStorage.set(token);
          set({ token, isAuth: !!token });
        },

        clearToken: () => {
          tokenStorage.remove();
          set({
            token: undefined,
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
