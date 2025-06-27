import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { tokenStorage } from '@kernel/index'
import type { AuthState, User } from '../types'

interface AuthStore extends AuthState {
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  login: (user: User, tokens: { accessToken: string; refreshToken: string }) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: user =>
        set({ user, isAuthenticated: !!user }),

      setLoading: isLoading =>
        set({ isLoading }),

      login: (user, tokens) => {
        tokenStorage.set(tokens.accessToken)
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        })
      },

      logout: () => {
        tokenStorage.remove()

        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        })
      },

    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
