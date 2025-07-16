import { useMutation } from '@tanstack/react-query';
import { cartApi, type ApiSuccessResponseCart } from '../api/cart-api';
import { QUERY_KEYS } from '@kernel/query/query-keys';
import type { CartAddItemRequest, CartUpdateItemRequest, CartRemoveItemRequest } from '../types';
import { queryClient } from '@kernel/query';
import type { ApiErrorResponse } from '@kernel/api';

export function useCartItem() {

  const addItemMutation = useMutation<ApiSuccessResponseCart, ApiErrorResponse, CartAddItemRequest>({
    mutationFn: (data: CartAddItemRequest) => cartApi.addCartItem(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.cart.details() });
      const previousCart = queryClient.getQueryData<ApiSuccessResponseCart>(QUERY_KEYS.cart.details());
      if (!previousCart?.data) return { previousCart };
      const product = previousCart.data.items.find(item => item.product.id === data.productId)?.product;
      const optimisticItem = {
        id: Math.random().toString(36),
        product: product ?? { id: data.productId, name: '', price: 0 },
        quantity: data.quantity,
        subtotal: (product?.price ?? 0) * data.quantity,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isOptimistic: true,
        isPending: true,
      };
      queryClient.setQueryData(QUERY_KEYS.cart.details(), {
        ...previousCart,
        data: {
          ...previousCart.data,
          items: [...previousCart.data.items, optimisticItem],
        },
      });
      return { previousCart } as { previousCart?: ApiSuccessResponseCart };
    },
    onError: (_err, _data, context) => {
      if ((context as { previousCart?: ApiSuccessResponseCart })?.previousCart) {
        queryClient.setQueryData(QUERY_KEYS.cart.details(), (context as { previousCart?: ApiSuccessResponseCart }).previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart.details() });
    },
  });

  const updateItemMutation = useMutation<ApiSuccessResponseCart, ApiErrorResponse, CartUpdateItemRequest>({
    mutationFn: ({ id, quantity }: CartUpdateItemRequest) => cartApi.updateCartItem(id, { id, quantity }),
    onMutate: async ({ id, quantity }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.cart.details() });
      const previousCart = queryClient.getQueryData<ApiSuccessResponseCart>(QUERY_KEYS.cart.details());
      if (!previousCart?.data) return { previousCart };
      queryClient.setQueryData(QUERY_KEYS.cart.details(), {
        ...previousCart,
        data: {
          ...previousCart.data,
          items: previousCart.data.items.map(item =>
            item.id === id ? { ...item, quantity, subtotal: item.product.price * quantity, isOptimistic: true, isPending: true } : item
          ),
        },
      });
      return { previousCart } as { previousCart?: ApiSuccessResponseCart };
    },
    onError: (_err, _data, context) => {
      if ((context as { previousCart?: ApiSuccessResponseCart })?.previousCart) {
        queryClient.setQueryData(QUERY_KEYS.cart.details(), (context as { previousCart?: ApiSuccessResponseCart }).previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart.details() });
    },
  });

  const removeItemMutation = useMutation<ApiSuccessResponseCart, ApiErrorResponse, CartRemoveItemRequest>({
    mutationFn: ({ id }: CartRemoveItemRequest) => cartApi.removeCartItem(id),
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.cart.details() });
      const previousCart = queryClient.getQueryData<ApiSuccessResponseCart>(QUERY_KEYS.cart.details());
      if (!previousCart?.data) return { previousCart };
      queryClient.setQueryData(QUERY_KEYS.cart.details(), {
        ...previousCart,
        data: {
          ...previousCart.data,
          items: previousCart.data.items.filter(item => item.id !== id),
        },
      });
      return { previousCart } as { previousCart?: ApiSuccessResponseCart };
    },
    onError: (_err, _data, context) => {
      if ((context as { previousCart?: ApiSuccessResponseCart })?.previousCart) {
        queryClient.setQueryData(QUERY_KEYS.cart.details(), (context as { previousCart?: ApiSuccessResponseCart }).previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.cart.details() });
    },
  });

  return {
    addItem: addItemMutation.mutateAsync,
    addItemStatus: addItemMutation.status,
    updateItem: updateItemMutation.mutateAsync,
    updateItemStatus: updateItemMutation.status,
    removeItem: removeItemMutation.mutateAsync,
    removeItemStatus: removeItemMutation.status,
  };
}
