import type { ChangePasswordPayload, ErrorResponse, SuccessResponseProfile } from '@modules/user/api';
import { toast } from '@kernel/notifications';
import { userApi } from '@modules/user/api';
import { useMutation } from '@tanstack/react-query';

export function useChangePassword() {
  return useMutation<SuccessResponseProfile, ErrorResponse, ChangePasswordPayload>({
    mutationFn: data => userApi.changePassword(data),
    onSuccess: (response) => {
      if (response.success && response.message) {
        toast.success(response.message);
      }

      return response.data;
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}
