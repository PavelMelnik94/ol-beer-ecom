import { useMutation } from '@tanstack/react-query';
import { cartApi } from '../api/cart-api';
import { QUERY_KEYS } from '@kernel/query/query-keys';
import type { CartPaymentRequest } from '../types';
import { queryClient } from '@kernel/query';

export function useCartPayment() {

  const paymentMutation = useMutation({
    mutationFn: (data: CartPaymentRequest) => cartApi.processCartPayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart.details() });
    },
  });

  return {
    processPayment: paymentMutation.mutate,
    paymentStatus: paymentMutation.status,
    paymentData: paymentMutation.data,
    paymentError: paymentMutation.error,
  };
}
