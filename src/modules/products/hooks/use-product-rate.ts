import type { SuccessResponseRate } from '@modules/products/api';
import { toast } from '@kernel/notifications';
import { useUserStore } from '@kernel/stores';
import { productsApi } from '@modules/products/api';
import { useMutation } from '@tanstack/react-query';

export function useProductRate() {
  const { optimisticUpdateRating, optimisticAddRating } = useUserStore();

  const rateProduct = useMutation<SuccessResponseRate, Error, { productId: string; rate: number; }>({
    mutationFn: ({ productId, rate }: { productId: string; rate: number; }) => {
      return productsApi.rateProduct(productId, rate);
    },
    onMutate: async ({ productId, rate }) => {
      const hasExistingRating = useUserStore.getState().hasRating(productId);

      if (hasExistingRating) {
        optimisticUpdateRating(productId, rate);
      }
      else {
        optimisticAddRating(productId, rate);
      }
    },
    onSuccess: (ratingResponse) => {
      if (ratingResponse.success && ratingResponse.message) {
        toast.success(ratingResponse.message);
      }

      if (!ratingResponse.success && ratingResponse.message) {
        toast.warning(ratingResponse.message);
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
