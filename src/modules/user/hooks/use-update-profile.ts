import type { User } from '@kernel/types';
import type { ErrorResponse, SuccessResponseProfile } from '@modules/user/api';
import { toast } from '@kernel/notifications';
import { QUERY_KEYS, queryClient } from '@kernel/query';
import { userApi } from '@modules/user/api';
import { useMutation } from '@tanstack/react-query';

export function useUpdateProfile() {
  return useMutation<SuccessResponseProfile, ErrorResponse, Partial<User>>({
    mutationKey: QUERY_KEYS.user.profile(),
    mutationFn: data => userApi.updateProfile(data),
    onSuccess: (response) => {
      if (response.success && response.message) {
        toast.success(response.message);

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.user.profile(),
        });

        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.auth.login(),
        });
      }

      return response.data;
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });
}
