import type { ApiErrorResponse, ApiSuccessResponse, User } from '@kernel/index';
import { API_ENDPOINTS, apiClient, queryKeys } from '@kernel/index';
import { useMutation } from '@tanstack/react-query';
import type { LoginCredentials } from '../model/types';
import { useAuthStore } from '../stores/auth-store';

type SuccessResponse = ApiSuccessResponse<User>;
type ErrorResponse = ApiErrorResponse;

export function useAuth() {
  const isAuth = useAuthStore(state => state.isAuth);
  const storeLogin = useAuthStore(state => state.login);
  const storeLogout = useAuthStore(state => state.logout);
  const user = useAuthStore(state => state.user);

  const mutation = useMutation<SuccessResponse, ErrorResponse, LoginCredentials>({
    mutationKey: queryKeys.auth.login(),
    mutationFn: ({ email, password }) =>
      apiClient.post(API_ENDPOINTS.auth.login, { email, password }),
  });

  const login = async (credentials: LoginCredentials) => {
    const res = await mutation.mutateAsync(credentials);

    if (res.success) {
      storeLogin(res.data);
    }

    return res;
  };

  const logout = () => {
    storeLogout();
  };

  return {
    isAuth,
    user,

    isLoading: mutation.isSuccess,
    isError: mutation.isError,

    login,
    logout,
  };
}
