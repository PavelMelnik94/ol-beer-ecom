import type { SuccessResponseRate } from '@modules/products/api';
import { toast } from '@kernel/notifications';
import { productsApi } from '@modules/products/api';
import { useUserStore } from '@modules/user/stores/user-store';
import { useMutation } from '@tanstack/react-query';

export function useProductRate() {
  const { optimisticUpdateRating, optimisticAddRating } = useUserStore();

  const rateProduct = useMutation<SuccessResponseRate, Error, { productId: string; rate: number; }>({
    mutationFn: ({ productId, rate }: { productId: string; rate: number; }) => {
      return productsApi.rateProduct(productId, rate);
    },
    onMutate: async ({ productId, rate }) => {
      // Optimistic update
      const hasExistingRating = useUserStore.getState().hasRating(productId);

      if (hasExistingRating) {
        optimisticUpdateRating(productId, rate);
      } else {
        optimisticAddRating(productId, rate);
      }
    },
    onSuccess: (res) => {
      if (res.success && res.message) {
        toast.success(res.message);
      }

      if (!res.success && res.message) {
        toast.warning(res.message);
      }
    },
    onError: () => {
      // Revert optimistic update on error
      // В реальном приложении здесь нужно восстановить предыдущее состояние
      toast.error('An error occurred while rating the product. Please try again later.');
    },
  });

  return {
    rateProduct: rateProduct.mutateAsync,
  };
}
