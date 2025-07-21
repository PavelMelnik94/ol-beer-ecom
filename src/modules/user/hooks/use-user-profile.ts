import type { ErrorResponse, SuccessResponseProfile } from '@modules/user/api';
import { QUERY_KEYS } from '@kernel/query';
import { useUserStore } from '@kernel/stores';
import { normalizeAvatarUrl } from '@kernel/utils';
import { userApi } from '@modules/user/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { clone } from '@shared/utils';

export function useUserProfile({ enabled = true }: { enabled?: boolean; } = {}) {
  const setProfile = useUserStore(s => s.setProfile);

  const { data: response, error, isLoading, isFetching } = useQuery<SuccessResponseProfile, ErrorResponse>({
    queryKey: QUERY_KEYS.user.profile(),
    queryFn: () => userApi.getProfile(),
    enabled,
    refetchOnMount: true,
    select: (response) => {
      if (response.success && response.data.avatar) {
        const cloned = clone(response);

        if (typeof cloned.data.avatar === 'string') {
        cloned.data.avatar = normalizeAvatarUrl(cloned.data.avatar);
        }

        return cloned;
      }

      return response;
    },
  });

  useEffect(() => {
    if (response?.data) {
      setProfile(response.data);
    }
  }, [isLoading, isFetching, response]);

  return {
    profile: response?.data,
    isLoading,
    error,
    isFetching,
  } as const;
}
