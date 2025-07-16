import type { ApiErrorResponse, ApiSuccessResponse } from '@kernel/api';
import type { User } from '@kernel/types';
import type { RegisterBody } from '@modules/auth/model/types';
import { toast } from '@kernel/notifications';
import { useAuthStore } from '@kernel/stores';
import { authApi, type RegisterResponse } from '@modules/auth/api';
import { useMutation } from '@tanstack/react-query';

export function useRegister() {
  const setToken = useAuthStore(s => s.setToken);

  const registerMutation = useMutation<ApiSuccessResponse<RegisterResponse>, ApiErrorResponse, RegisterBody>({
    mutationFn: data => authApi.register(data),
    onSuccess: (response) => {
      if (response.success && response.message) {
        toast.success(response.message);
        setToken(response.data.token);
      }

      if (!response.success && response.message) {
        toast.error(response.message);
      }
    },
    onError: () => {
      toast.error('Invalid data provided');
    },
  });

  return registerMutation;
}
