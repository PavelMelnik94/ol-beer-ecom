import type { ErrorResponse, SuccessResponseProfile } from '@modules/user/api';
import { QUERY_KEYS } from '@kernel/query';
import { userApi } from '@modules/user/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useUserStore } from '@kernel/stores';

export function useUserProfile({ enabled = true }: { enabled?: boolean; } = {}) {
  const setProfile = useUserStore(s => s.setProfile);

  const { data: response, error, isLoading, isFetching } = useQuery<SuccessResponseProfile, ErrorResponse>({
    queryKey: QUERY_KEYS.user.profile(),
    queryFn: () => userApi.getProfile(),
    enabled,
    refetchOnMount: true,
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
