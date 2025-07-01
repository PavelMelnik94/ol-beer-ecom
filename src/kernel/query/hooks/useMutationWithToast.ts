import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

interface ToastOptions {
  success?: string
  error?: string
}

/**
 * Хук для мутаций с автоматическими toast уведомлениями
 */
export function useMutationWithToast<TData, TError, TVariables, TContext>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, TError, TVariables, TContext> & {
    toast?: ToastOptions
  },
) {
  const { toast, ...mutationOptions } = options || {}

  return useMutation({
    mutationFn,
    onSuccess: (data, variables, context) => {
      if (toast?.success) {
        // TODO: Добавить toast notification
        // eslint-disable-next-line no-console
        console.log('✅ Success:', toast.success)
      }
      options?.onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      if (toast?.error) {
        // TODO: Добавить toast notification
        console.error('❌ Error:', toast.error)
      }
      options?.onError?.(error, variables, context)
    },
    ...mutationOptions,
  })
}
