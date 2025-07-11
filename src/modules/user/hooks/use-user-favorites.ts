import type { SuccessResponseFavorites } from '@modules/user/api';
import type { ToggleFavoriteData } from '@modules/user/model';
import type { ErrorResponse } from 'react-router-dom';
import { toast } from '@kernel/notifications';
import { QUERY_KEYS } from '@kernel/query';
import { userApi } from '@modules/user/api';
import { useUserStore } from '@modules/user/stores/user-store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useUserFavorites({ enabled = true }: { enabled?: boolean; }) {
  const { data: response, error, isLoading, refetch } = useQuery<SuccessResponseFavorites, ErrorResponse>({
    queryKey: QUERY_KEYS.user.favorites(),
    queryFn: () => userApi.getFavorites(),
    enabled,
  });

  const { setFavorites } = useUserStore();

  useEffect(() => {
    if (response?.data) {
      setFavorites(response.data);
    }
  }, [response, error, isLoading]);

  return {
    favorites: response?.data || [],
    isLoading,
    error,
    refetchFavorites: refetch,
  } as const;
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const { optimisticToggleFavorite } = useUserStore();

  return useMutation({
    mutationFn: (data: ToggleFavoriteData) => userApi.toggleFavorite(data),
    onMutate: async (variables) => {
      // Optimistic update
      optimisticToggleFavorite(variables.productId);
    },
    onSuccess: (res) => {
      if (res.message) {
        toast.success(res.message);
      }
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.favorites() });
    },
    onError: (error, variables) => {
      optimisticToggleFavorite(variables.productId);
      toast.error(error.message);
    },
  });
}

export function useIsFavorite(productId: string) {
  const { hasFavorite } = useUserStore();

  return {
    isFavorite: hasFavorite(productId),
  } as const;
}
