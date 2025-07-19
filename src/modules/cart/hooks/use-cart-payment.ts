import type { CartPaymentRequest } from '../types';
import { QUERY_KEYS, queryClient } from '@kernel/index';
import { useMutation } from '@tanstack/react-query';
import { cartApi } from '../api/cart-api';
import { cartModel } from '../model';

export function useCartPayment() {
  const paymentMutation = useMutation({
    mutationFn: (data: CartPaymentRequest) => cartApi.processCartPayment(data),
    onSuccess: () => {
      queryClient.setQueryData(QUERY_KEYS.cart.details(), (previous: any) => {
        if (!previous?.data) return previous;
        return {
          ...previous,
          data: cartModel.clearCart(previous.data),
        };
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart.details() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user.profile() });
    },
  });

  return {
    processPayment: paymentMutation.mutateAsync,
    paymentStatus: paymentMutation.status,
    paymentData: paymentMutation.data,
    paymentError: paymentMutation.error,
  };
}
