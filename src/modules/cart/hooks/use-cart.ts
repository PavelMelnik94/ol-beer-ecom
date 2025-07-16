import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '../api/cart-api';
import { QUERY_KEYS } from '@kernel/query/query-keys';
import type { CartApiResponse } from '../types';

export function useCart() {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<CartApiResponse>({
    queryKey: QUERY_KEYS.cart.details(),
    queryFn: cartApi.getCart,
  });

  const clearCartMutation = useMutation({
    mutationFn: cartApi.clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart.details() });
    },
  });

  return {
    cart: data?.cart ?? null,
    isLoading,
    isError,
    error,
    refetch,
    clearCart: clearCartMutation.mutate,
    clearCartStatus: clearCartMutation.status,
  };
}
