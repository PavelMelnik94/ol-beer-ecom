import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { User } from '@kernel/index';
import { tokenStorage } from '@kernel/index'
import type { AuthState } from '../model/types'

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      set => ({
        user: null,
        isAuth: false,

        setUser: user =>
          set({ user, isAuth: !!user }),

        login: (user) => {
          tokenStorage.set(user.token)
          set({
            user,
            isAuth: true,
          })
        },

        logout: () => {
          tokenStorage.remove()
          set({
            user: null,
            isAuth: false,
          })
        },

      }),
      {
        name: 'auth-storage',
        partialize: state => ({
          user: state.user,
          isAuth: state.isAuth,
        }),
      },
    ),
  ),
)
