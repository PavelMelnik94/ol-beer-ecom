import type { SuccessResponseAvatar } from '@modules/user/api';
import type { UploadAvatarData } from '@modules/user/model';
import type { ErrorResponse } from 'react-router-dom';
import { useUserStore } from '@kernel/index';
import { QUERY_KEYS, queryClient } from '@kernel/query';
import { userApi } from '@modules/user/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useUserAvatar() {
  const { data: response, error, isLoading } = useQuery<SuccessResponseAvatar, ErrorResponse>({
    queryKey: QUERY_KEYS.user.avatar(),
    queryFn: () => userApi.getAvatarUrl(),
  });

  return {
    avatarUrl: response?.data?.avatarUrl,
    isLoading,
    error,
  } as const;
}

export function useUploadAvatar() {
  const { setProfile } = useUserStore();

  return useMutation({
    mutationFn: (data: UploadAvatarData) => userApi.uploadAvatar(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.avatar() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.profile() });

      const currentUser = useUserStore.getState().profile;
      if (currentUser) {
        setProfile({
          ...currentUser,
          avatar: response.data.avatarUrl,
        });
      }
    },
  });
}

export function useDeleteAvatar() {
  const queryClient = useQueryClient();
  const { setProfile } = useUserStore();

  return useMutation({
    mutationFn: () => userApi.deleteAvatar(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.avatar() });

      const currentUser = useUserStore.getState().profile;
      if (currentUser) {
        setProfile({
          ...currentUser,
          avatar: undefined,
        });
      }
    },
  });
}
