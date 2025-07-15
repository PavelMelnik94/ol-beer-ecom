import type { ErrorResponse, SuccessResponseProfile } from '@modules/user/api';
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
    profile: response?.data,
    isLoading,
    error,
    isFetching,
  } as const;
}
