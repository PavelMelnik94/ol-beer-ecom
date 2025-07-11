import type { SuccessResponseAvatar } from '@modules/user/api';
import type { UploadAvatarData } from '@modules/user/model';
import type { ErrorResponse } from 'react-router-dom';
import { QUERY_KEYS } from '@kernel/query';
import { userApi } from '@modules/user/api';
import { useUserStore } from '@modules/user/stores/user-store';
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
  const queryClient = useQueryClient();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: (data: UploadAvatarData) => userApi.uploadAvatar(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.avatar() });

      const currentUser = useUserStore.getState().user;
      if (currentUser) {
        setUser({
          ...currentUser,
          avatar: response.data.avatarUrl,
        });
      }
    },
  });
}

export function useDeleteAvatar() {
  const queryClient = useQueryClient();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: () => userApi.deleteAvatar(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.avatar() });

      const currentUser = useUserStore.getState().user;
      if (currentUser) {
        setUser({
          ...currentUser,
          avatar: null,
        });
      }
    },
  });
}
