import type { ErrorResponse, SuccessResponseProducts } from '../api';
import { QUERY_KEYS } from '@kernel/index';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '../api';

export function useProductsRandom(limit = 4) {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<SuccessResponseProducts, ErrorResponse>({
    queryKey: QUERY_KEYS.products.random(),
    queryFn: () => productsApi.getFeaturedProducts(limit),
  });

  return {
    products: data?.data,
    isLoading,
    isError,
    error,
  } as const;
}
