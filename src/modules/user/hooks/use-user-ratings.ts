import type { SuccessResponseRatings } from '@modules/user/api';
import type { ErrorResponse } from 'react-router-dom';
import { useUserStore } from '@kernel/index';
import { QUERY_KEYS } from '@kernel/query';
import { userApi } from '@modules/user/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { clone } from '@shared/utils';

export function useUserRatings({ enabled = true }: { enabled?: boolean; }) {
  const { data: response, error, isLoading, refetch } = useQuery<SuccessResponseRatings, ErrorResponse>({
    queryKey: QUERY_KEYS.user.ratings(),
    queryFn: () => userApi.getRatings(),
    enabled,
  });

  const { setRatings } = useUserStore();

  useEffect(() => {
    if (response?.data) {
      setRatings(clone(response.data));
    }
  }, [response, error, isLoading]);

  return {
    ratings: response?.data || [],
    isLoading,
    error,
    refetchRatings: refetch,
  } as const;
}

export function useUserRating(productId: string) {
  const { hasRating } = useUserStore();

  const rating = hasRating(productId);
  return {
    rating,
    hasRating: !!rating,
  } as const;
}
