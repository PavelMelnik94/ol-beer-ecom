import type { SuccessResponseFavorites } from '@modules/user/api';
import type { ToggleFavoriteData } from '@modules/user/model';
import type { ErrorResponse } from 'react-router-dom';
import { QUERY_KEYS } from '@kernel/query';
import { userApi } from '@modules/user/api';
import { userStore } from '@modules/user/stores/user-store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useUserFavorites({ enabled = true }: { enabled?: boolean; }) {
  const { data: response, error, isLoading } = useQuery<SuccessResponseFavorites, ErrorResponse>({
    queryKey: QUERY_KEYS.user.favorites(),
    queryFn: () => userApi.getFavorites(),
    enabled,
  });

  return {
    favorites: response?.data || [],
    isLoading,
    error,
  } as const;
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const { setFavorites, hasFavorite } = userStore();

  return useMutation({
    mutationFn: (data: ToggleFavoriteData) => userApi.toggleFavorite(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.favorites() });

      const currentFavorites = userStore.getState().favorites;
      const isFavorite = hasFavorite(variables.productId);

      let updatedFavorites;
      if (isFavorite) {
        updatedFavorites = currentFavorites.filter(
          favorite => favorite.productId !== variables.productId,
        );
      }
      else {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.favorites() });
        return;
      }

      setFavorites(updatedFavorites);
    },
  });
}

export function useIsFavorite(productId: string) {
  const { hasFavorite } = userStore();

  return {
    isFavorite: hasFavorite(productId),
  } as const;
}
