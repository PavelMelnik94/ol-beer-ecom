import type { ApiErrorResponse, ApiSuccessResponse } from '@kernel/index';
import { API_ENDPOINTS, apiClient, QUERY_KEYS, toast, useAuthStore } from '@kernel/index';
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

  const mutation = useMutation<SuccessResponse, ErrorResponse, LoginCredentials>({
    mutationKey: QUERY_KEYS.auth.login(),
    mutationFn: ({ email, password }) =>
      apiClient.post(API_ENDPOINTS.auth.login, { email, password }),
    onSuccess: (res) => {
      if (res.success && res.data) {
        const { token, firstName } = res.data;
        setToken(token);
        toast.success(`Welcome back, ${firstName}`);
      }
    },
  });

  const logout = () => {
    clearToken();
  };

  return {

    isLoading: mutation.isSuccess,
    isError: mutation.isError,

    login: mutation.mutateAsync,
    logout,
  };
}
