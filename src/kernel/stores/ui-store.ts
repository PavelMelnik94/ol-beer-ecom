import { themeStorage } from '@kernel/storage'
import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'

// UI Store для глобального состояния UI
interface UiState {
  // Modals
  isModalOpen: boolean
  modalType: string | null
  modalData: any

  // Loading states
  isLoading: boolean
  loadingText: string

  // Sidebar
  isSidebarOpen: boolean

  // Theme
  theme: 'light' | 'dark'

  // Notifications
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message?: string
    duration?: number
  }>
}

interface UiActions {
  // Modal actions
  openModal: (type: string, data?: any) => void
  closeModal: () => void

  // Loading actions
  setLoading: (loading: boolean, text?: string) => void

  // Sidebar actions
  toggleSidebar: () => void
  setSidebar: (open: boolean) => void

  // Theme actions
  setTheme: (theme: UiState['theme']) => void

  // Notification actions
  addNotification: (notification: Omit<UiState['notifications'][0], 'id'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

export const useUiStore = create<UiState & UiActions>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      // Initial state
      isModalOpen: false,
      modalType: null,
      modalData: null,
      isLoading: false,
      loadingText: '',
      isSidebarOpen: false,
      theme: themeStorage.get() ?? 'light',
      notifications: [],

      // Modal actions
      openModal: (type, data) => set({
        isModalOpen: true,
        modalType: type,
        modalData: data,
      }),

      closeModal: () => set({
        isModalOpen: false,
        modalType: null,
        modalData: null,
      }),

      // Loading actions
      setLoading: (loading, text = '') => set({
        isLoading: loading,
        loadingText: text,
      }),

      // Sidebar actions
      toggleSidebar: () => set(state => ({
        isSidebarOpen: !state.isSidebarOpen,
      })),

      setSidebar: open => set({ isSidebarOpen: open }),

      // Theme actions
      setTheme: theme => set({ theme }),

      // Notification actions
      addNotification: (notification) => {
        const id = Math.random().toString(36).substr(2, 9)
        set(state => ({
          notifications: [...state.notifications, { ...notification, id }],
        }))

        // Auto remove after duration
        if (notification.duration !== 0) {
          setTimeout(() => {
            get().removeNotification(id)
          }, notification.duration || 5000)
        }
      },

      removeNotification: id => set(state => ({
        notifications: state.notifications.filter(n => n.id !== id),
      })),

      clearNotifications: () => set({ notifications: [] }),
    })),
    {
      name: 'ui-store',
    },
  ),
)
