import { useMutation } from '@tanstack/react-query';
import { cartApi, type ApiSuccessResponseCart } from '../api/cart-api';
import { QUERY_KEYS } from '@kernel/query/query-keys';
import type { CartAddItemRequest, CartUpdateItemRequest, CartRemoveItemRequest } from '../types';
import { queryClient } from '@kernel/query';
import type { ApiErrorResponse } from '@kernel/api';

export function useCartItem() {

  const addItemMutation = useMutation<ApiSuccessResponseCart, ApiErrorResponse, CartAddItemRequest>({
    mutationFn: (data: CartAddItemRequest) => cartApi.addCartItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart.details() });
    },
  });

  const updateItemMutation = useMutation<ApiSuccessResponseCart, ApiErrorResponse, CartUpdateItemRequest>({
    mutationFn: ({ id, quantity }: CartUpdateItemRequest) => cartApi.updateCartItem(id, { id, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart.details() });
    },
  });

  const removeItemMutation = useMutation<ApiSuccessResponseCart, ApiErrorResponse, CartRemoveItemRequest>({
    mutationFn: ({ id }: CartRemoveItemRequest) => cartApi.removeCartItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart.details() });
    },
  });

  return {
    addItem: addItemMutation.mutate,
    addItemStatus: addItemMutation.status,
    updateItem: updateItemMutation.mutate,
    updateItemStatus: updateItemMutation.status,
    removeItem: removeItemMutation.mutate,
    removeItemStatus: removeItemMutation.status,
  };
}
