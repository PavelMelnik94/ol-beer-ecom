import type { ErrorResponse } from 'react-router-dom';
import { QUERY_KEYS } from '@kernel/index';
import { useQuery } from '@tanstack/react-query';
import { productsApi, type SuccessResponseProductDetails } from '@modules/products/api';

export function useProductDetails(id: string) {
  const { data: response, error, isLoading } = useQuery<SuccessResponseProductDetails, ErrorResponse>({
    queryKey: QUERY_KEYS.products.detail(id),
    queryFn: () => productsApi.getProductById(id),
    enabled: !!id,
  });


  return {
    product: response?.data,
    isLoading,
    error,
  } as const;
}
