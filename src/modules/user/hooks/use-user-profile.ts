import type { SuccessResponseProfile } from '@modules/user/api';
import type { ErrorResponse } from 'react-router-dom';
import { QUERY_KEYS } from '@kernel/query';
import { userApi } from '@modules/user/api';
import { useQuery } from '@tanstack/react-query';

export function useUserProfile(enabled: boolean = true) {
  const { data: response, error, isLoading, isFetching } = useQuery<SuccessResponseProfile, ErrorResponse>({
    queryKey: QUERY_KEYS.user.profile(),
    queryFn: () => userApi.getProfile(),
    enabled,
    refetchOnMount: true,
  });

  return {
    profile: response?.data || null,
    isLoading,
    error,
    isFetching,
  } as const;
}
