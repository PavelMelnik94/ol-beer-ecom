import type { ApiErrorResponse, ApiSuccessResponse } from '@kernel/index';
import { API_ENDPOINTS, apiClient, QUERY_KEYS, toast, useAuthStore, useGoTo } from '@kernel/index';
import { useMutation } from '@tanstack/react-query';

export interface LoginCredentials {
  email: string;
  password: string;
}
type SuccessResponse = ApiSuccessResponse<{ token: string; firstName: string; }>;
type ErrorResponse = ApiErrorResponse;

export function useAuth() {
  const setToken = useAuthStore(s => s.setToken);
  const clearToken = useAuthStore(s => s.clearToken);
  const navigateToBlog = useGoTo().navigateToBlog;

  const mutation = useMutation<SuccessResponse, ErrorResponse, LoginCredentials>({
    mutationKey: QUERY_KEYS.auth.login(),
    mutationFn: ({ email, password }) =>
      apiClient.post(API_ENDPOINTS.auth.login, { email, password }),
    onSuccess: (response) => {
      if (response.success && response.data) {
        const { token, firstName } = response.data;
        setToken(token);
        toast.success(`Welcome back, ${firstName}`);
      }
    },
  });

  const logout = () => {
    clearToken();
    navigateToBlog();
  };

  return {

    isLoading: mutation.isSuccess,
    isError: mutation.isError,

    login: mutation.mutateAsync,
    logout,
  };
}
