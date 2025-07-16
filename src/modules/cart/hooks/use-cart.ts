import { useQuery, useMutation } from '@tanstack/react-query';
import { cartApi, type ApiSuccessResponseCart } from '../api/cart-api';
import { QUERY_KEYS } from '@kernel/query/query-keys';
import { queryClient } from '@kernel/query';
import type { ApiErrorResponse } from '@kernel/api';

export function useCart() {

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<ApiSuccessResponseCart, ApiErrorResponse>({
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
    cart: data?.data ?? null,
    isLoading,
    isError,
    error,
    refetch,
    clearCart: clearCartMutation.mutate,
    clearCartStatus: clearCartMutation.status,
  };
}
