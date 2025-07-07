import type { ErrorResponse, SuccessResponseProducts } from '../../products/api';
import { QUERY_KEYS } from '@kernel/index';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../../products/api';

export function useProductsRelated(productId: string) {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<SuccessResponseProducts, ErrorResponse>({
    queryKey: QUERY_KEYS.products.related(productId),
    queryFn: () => productsApi.getRelatedProducts(productId),
    enabled: !!productId,
  });

  return {
    products: data?.data,
    isLoading,
    isError,
    error,
  } as const;
}
