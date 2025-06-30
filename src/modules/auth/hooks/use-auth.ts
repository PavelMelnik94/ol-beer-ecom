import { useMutation } from '@tanstack/react-query';
import { API_ENDPOINTS, apiClient, queryKeys } from '@kernel/index';
import type { ApiErrorResponse, ApiSuccessResponse, User } from '@kernel/index';
import { useAuthStore } from '../stores/auth-store';
import type { LoginCredentials } from '../model/types';

type SuccessResponse = ApiSuccessResponse<User>;
type ErrorResponse = ApiErrorResponse;

export function useAuth() {
  const { isAuth, login: storeLogin, logout: storeLogout, user } = useAuthStore(state => ({
    isAuth: state.isAuth,
    login: state.login,
    logout: state.logout,
    user: state.user,
  }));

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
