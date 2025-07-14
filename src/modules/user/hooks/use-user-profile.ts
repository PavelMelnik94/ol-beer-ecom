import type { SuccessResponseProfile } from '@modules/user/api';
import type { ErrorResponse } from 'react-router-dom';
import { QUERY_KEYS } from '@kernel/query';
import { userApi } from '@modules/user/api';
import { useUserStore } from '@modules/user/stores/user-store';
import { useQuery } from '@tanstack/react-query';
import { clone } from 'lodash-es';
import { useEffect } from 'react';

export function useUserProfile(enabled: boolean = true) {
  const { data: response, error, isLoading, isFetching } = useQuery<SuccessResponseProfile, ErrorResponse>({
    queryKey: QUERY_KEYS.user.profile(),
    queryFn: () => userApi.getProfile(),
    enabled,
    refetchOnMount: true,
  });

  const { setProfile } = useUserStore();

  useEffect(() => {
    if (response?.data) {
      setProfile(clone(response.data));
    }
  }, [response, error, isLoading]);

  return {
    profile: response?.data || null,
    isLoading,
    error,
    isFetching,
  } as const;
}
