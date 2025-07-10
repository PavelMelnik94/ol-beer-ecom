import type { SuccessResponseRate } from '@modules/products/api';
import { toast } from '@kernel/notifications';
import { productsApi } from '@modules/products/api';
import { useMutation } from '@tanstack/react-query';

export function useProductRate() {
  const rateProduct = useMutation<SuccessResponseRate, Error, { productId: string; rate: number; }>({
    mutationFn: ({ productId, rate }: { productId: string; rate: number; }) => {
      return productsApi.rateProduct(productId, rate);
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
      toast.error('An error occurred while rating the product. Please try again later.');
    },
  });

  return {
    rateProduct: rateProduct.mutate,
  };
}
