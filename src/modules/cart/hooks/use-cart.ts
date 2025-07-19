import type { ApiErrorResponse } from '@kernel/api';
import type { ApiSuccessResponseCart } from '../api/cart-api';
import { QUERY_KEYS, queryClient } from '@kernel/index';
import { useCartStore } from '@modules/cart/stores/cart-store';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { cartApi } from '../api/cart-api';
import { cartModel } from '../model';

export function useCart({ enabled = true }: { enabled?: boolean; }) {
  const clearItemIds = useCartStore(s => s.clearItemIds);
  const addItemId = useCartStore(s => s.addItemId);
  const setOrders = useCartStore(s => s.setOrders);

  const {
    data: cartResponse,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<ApiSuccessResponseCart, ApiErrorResponse>({
    queryKey: QUERY_KEYS.cart.details(),
    queryFn: cartApi.getCart,
    enabled,
  });

  useEffect(() => {
    const data = cartResponse?.data;
    if (data) {
      clearItemIds();
      for (const item of cartResponse.data.items) {
        addItemId(item.product.id);
      }

      if (data?.items) {
        setOrders(data?.items);
      }
    }
  }, [cartResponse, isLoading]);

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

      clearItemIds();
      return { previousCart } as { previousCart?: any; };
    },
    onError: (_error, _data, context) => {
      if ((context as { previousCart?: any; })?.previousCart) {
        queryClient.setQueryData(QUERY_KEYS.cart.details(), (context as { previousCart?: any; }).previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart.details() });
    },
  });

  return {
    cart: cartResponse?.data,
    isLoading,
    isError,
    error,
    refetch,
    clearCart: clearCartMutation.mutateAsync,
    clearCartStatus: clearCartMutation.status,
  };
}
