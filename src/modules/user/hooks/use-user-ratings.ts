import type { SuccessResponseRatings } from '@modules/user/api';
import type { ErrorResponse } from 'react-router-dom';
import { QUERY_KEYS } from '@kernel/query';
import { userApi } from '@modules/user/api';
import { userStore } from '@modules/user/stores/user-store';
import { useQuery } from '@tanstack/react-query';

export function useUserRatings({ enabled = true }: { enabled?: boolean; }) {
  const { data: response, error, isLoading } = useQuery<SuccessResponseRatings, ErrorResponse>({
    queryKey: QUERY_KEYS.user.ratings(),
    queryFn: () => userApi.getRatings(),
    enabled,
  });

  return {
    ratings: response?.data || [],
    isLoading,
    error,
  } as const;
}

export function useUserRating(productId: string) {
  const { hasRating } = userStore();

  const rating = hasRating(productId);

  return {
    rating,
    hasRating: !!rating,
  } as const;
}
