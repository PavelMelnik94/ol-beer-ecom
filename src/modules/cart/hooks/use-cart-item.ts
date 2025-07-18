import type { ApiErrorResponse } from '@kernel/api';
import type { ApiSuccessResponseCart } from '../api/cart-api';
import type { CartAddItemRequest, CartRemoveItemRequest, CartUpdateItemRequest } from '../types';
import { QUERY_KEYS, queryClient, toast } from '@kernel/index';
import { useCartStore } from '@modules/cart/stores/cart-store';
import { useMutation } from '@tanstack/react-query';
import { cartApi } from '../api/cart-api';
import { cartModel } from '../model';

export function useCartItem() {
  const addItemId = useCartStore(s => s.addItemId);
  const removeItemId = useCartStore(s => s.removeItemId);

  const addItemMutation = useMutation<ApiSuccessResponseCart, ApiErrorResponse, CartAddItemRequest>({
    mutationFn: (data: CartAddItemRequest) => cartApi.addCartItem(data),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.cart.details() });
      const previousCart = queryClient.getQueryData<ApiSuccessResponseCart>(QUERY_KEYS.cart.details());
      if (!previousCart?.data) return { previousCart };
      const product = previousCart.data.items.find(item => item.product.id === data.productId)?.product ?? cartModel.getDefaultProduct(data.productId);
      addItemId(product.id);
      const optimisticItem = cartModel.createOptimisticCartItem(product, data.quantity);
      queryClient.setQueryData(QUERY_KEYS.cart.details(), {
        ...previousCart,
        data: {
          ...previousCart.data,
          items: [...previousCart.data.items, optimisticItem],
        },
      });

      toast.success(`Added to cart`);
      return { previousCart } as { previousCart?: ApiSuccessResponseCart; };
    },
    onError: (_err, _data, context) => {
      if ((context as { previousCart?: ApiSuccessResponseCart; }).previousCart) {
        queryClient.setQueryData(QUERY_KEYS.cart.details(), (context as { previousCart?: ApiSuccessResponseCart; }).previousCart);
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
            item.id === id
              ? { ...item, quantity, subtotal: item.product.price * quantity, isOptimistic: true, isPending: true }
              : item,
          ),
        },
      });

      const productTitle = previousCart.data.items.find(item => item.id === id)?.product.title;
      toast.success(
        `Quantity form ${productTitle} updated to ${quantity}`,
      );

      return { previousCart } as { previousCart?: ApiSuccessResponseCart; };
    },
    onError: (_err, _data, context) => {
      if ((context as { previousCart?: ApiSuccessResponseCart; }).previousCart) {
        queryClient.setQueryData(QUERY_KEYS.cart.details(), (context as { previousCart?: ApiSuccessResponseCart; }).previousCart);
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
      removeItemId(id);
      toast.error(`Removed item from cart`);

      return { previousCart } as { previousCart?: ApiSuccessResponseCart; };
    },
    onError: (_err, _data, context) => {
      if ((context as { previousCart?: ApiSuccessResponseCart; })?.previousCart) {
        queryClient.setQueryData(QUERY_KEYS.cart.details(), (context as { previousCart?: ApiSuccessResponseCart; }).previousCart);
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
