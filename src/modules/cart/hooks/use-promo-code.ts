import { useMutation } from '@tanstack/react-query';
import { cartApi } from '../api/cart-api';
import { QUERY_KEYS } from '@kernel/query/query-keys';
import type { CartApplyPromoRequest } from '../types';
import { queryClient } from '@kernel/query';

export function usePromoCode() {

  const applyPromoMutation = useMutation({
    mutationFn: (data: CartApplyPromoRequest) => cartApi.applyPromoCode(data),
    onMutate: async (data: CartApplyPromoRequest) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.cart.details() });
      const previousCart = queryClient.getQueryData<any>(QUERY_KEYS.cart.details());
      if (!previousCart?.data) return { previousCart };
      queryClient.setQueryData(QUERY_KEYS.cart.details(), {
        ...previousCart,
        data: {
          ...previousCart.data,
          promoCode: data.promoCode,
          discountAmount: 0,
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

  const removePromoMutation = useMutation({
    mutationFn: cartApi.removePromoCode,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.cart.details() });
      const previousCart = queryClient.getQueryData<any>(QUERY_KEYS.cart.details());
      if (!previousCart?.data) return { previousCart };
      queryClient.setQueryData(QUERY_KEYS.cart.details(), {
        ...previousCart,
        data: {
          ...previousCart.data,
          promoCode: null,
          discountAmount: 0,
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
    applyPromo: applyPromoMutation.mutate,
    applyPromoStatus: applyPromoMutation.status,
    removePromo: removePromoMutation.mutate,
    removePromoStatus: removePromoMutation.status,
  };
}
