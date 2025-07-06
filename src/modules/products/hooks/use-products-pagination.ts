import type { ErrorResponse, SuccessResponseFilterProducts } from '@modules/products/api';
import type { Filters } from '../model';

import { QUERY_KEYS } from '@kernel/index';
import { productsApi } from '@modules/products/api';
import { useProductsStore } from '@modules/products/stores/products-store';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { productsModel } from '../model';

const LIMIT = 16;

interface UseProductsPaginationProps {
  page?: number;
  filterParams: Filters;
}

export function useProductsPagination({
  page = 1,
  filterParams,
}: UseProductsPaginationProps) {
  const {
    productsState,
    setProducts,
    setPagination,
    setProductsLoading,
  } = useProductsStore();

  const filters = { ...filterParams, limit: LIMIT, page };
  const queryString = productsModel.getFilterParams(filters);

  const {
    data: productsData,
    isLoading: isQueryLoading,
    error: queryError,
    refetch,
  } = useQuery<SuccessResponseFilterProducts, ErrorResponse>({
    queryKey: [QUERY_KEYS.products.list(), page, queryString],
    queryFn: () => productsApi.getProductsFiltered(queryString, page, LIMIT),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: false,
  });

  useEffect(() => {
    if (productsData?.data) {
      setProducts(productsData.data);
      setPagination({
        page: productsData.pagination.page,
        totalPages: productsData.pagination.totalPages,
      });
    }
  }, [productsData, setProducts, setPagination]);

  useEffect(() => {
    setProductsLoading(isQueryLoading);
  }, [isQueryLoading, setProductsLoading]);

  return {
    // data
    products: productsState.products,
    pagination: productsState.pagination,

    // states loading
    isLoading: productsState.isLoading,

    // errors
    error: queryError,

    // actions
    refetch,
  } as const;
}
