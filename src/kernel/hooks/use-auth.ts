import type { ApiErrorResponse, ApiSuccessResponse, User } from '@kernel/index';
import { API_ENDPOINTS, apiClient, QUERY_KEYS, useAuthStore } from '@kernel/index';
import { useUserFavorites, useUserRatings } from '@modules/user';
import { useMutation } from '@tanstack/react-query';

export interface LoginCredentials {
  email: string;
  password: string;
}
type SuccessResponse = ApiSuccessResponse<User>;
type ErrorResponse = ApiErrorResponse;

export function useAuth() {
  const storeLogin = useAuthStore(state => state.login);
  const storeLogout = useAuthStore(state => state.logout);
  const isAuth = useAuthStore(state => state.isAuth);

  const mutation = useMutation<SuccessResponse, ErrorResponse, LoginCredentials>({
    mutationKey: QUERY_KEYS.auth.login(),
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

    isLoading: mutation.isSuccess,
    isError: mutation.isError,

    login,
    logout,
    isAuth,
  };
}
