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
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.cart.details() });
      const previousCart = queryClient.getQueryData<any>(QUERY_KEYS.cart.details());
      if (!previousCart?.data) return { previousCart };
      queryClient.setQueryData(QUERY_KEYS.cart.details(), {
        ...previousCart,
        data: {
          ...previousCart.data,
          items: [],
          total: 0,
          discountAmount: 0,
          promoCode: null,
        },
      });
      return { previousCart } as { previousCart?: any };
    },
    onError: (_err, _data, context) => {
      if ((context as { previousCart?: any })?.previousCart) {
        queryClient.setQueryData(QUERY_KEYS.cart.details(), (context as { previousCart?: any }).previousCart);
      }
    },
    onSettled: () => {
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
