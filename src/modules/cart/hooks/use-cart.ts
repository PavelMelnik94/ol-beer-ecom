import type { ApiErrorResponse } from '@kernel/api';
import type { ApiSuccessResponseCart } from '../api/cart-api';
import { QUERY_KEYS, queryClient } from '@kernel/index';
import { useMutation, useQuery } from '@tanstack/react-query';
import { cartApi } from '../api/cart-api';
import { cartModel } from '../model';

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
        data: cartModel.clearCart(previousCart.data),
      });
      return { previousCart } as { previousCart?: any; };
    },
    onError: (_err, _data, context) => {
      if ((context as { previousCart?: any; })?.previousCart) {
        queryClient.setQueryData(QUERY_KEYS.cart.details(), (context as { previousCart?: any; }).previousCart);
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
    clearCart: clearCartMutation.mutateAsync,
    clearCartStatus: clearCartMutation.status,
  };
}
