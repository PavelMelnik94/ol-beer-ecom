import { useMutation } from '@tanstack/react-query';
import { cartApi } from '../api/cart-api';
import { QUERY_KEYS } from '@kernel/query/query-keys';
import type { CartApplyPromoRequest } from '../types';
import { queryClient } from '@kernel/query';

export function usePromoCode() {

  const applyPromoMutation = useMutation({
    mutationFn: (data: CartApplyPromoRequest) => cartApi.applyPromoCode(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart.details() });
    },
  });

  const removePromoMutation = useMutation({
    mutationFn: cartApi.removePromoCode,
    onSuccess: () => {
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
