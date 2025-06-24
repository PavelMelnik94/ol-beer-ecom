import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Время кэширования (5 минут)
      staleTime: 1000 * 60 * 5,
      // Время жизни кэша (10 минут)
      gcTime: 1000 * 60 * 10,
      // Повторные запросы
      retry: (failureCount, error: any) => {
        // Не повторять для 4xx ошибок
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false
        }
        // Максимум 3 повтора для остальных ошибок
        return failureCount < 3
      },
      // Интервал между повторами
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Обновление при фокусе окна
      refetchOnWindowFocus: false,
      // Обновление при восстановлении соединения
      refetchOnReconnect: true,
    },
    mutations: {
      // Повторы для мутаций
      retry: 1,
      retryDelay: 1000,
    },
  },
})

export default queryClient
