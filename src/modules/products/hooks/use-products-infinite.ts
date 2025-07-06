import type { ErrorResponse, SuccessResponseFilterProducts } from '@modules/products/api';
import type { Filters } from '../model';
import { QUERY_KEYS } from '@kernel/index';
import { productsApi } from '@modules/products/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import {  useMemo } from 'react';
import z from 'zod';
import { productsModel } from '../model';

const LIMIT = 25;

export function useProductsInfinite({ filterParams }: { filterParams: Filters; }) {
  const filters = { ...filterParams, limit: LIMIT };
  const targetPage = filterParams?.page ?? 1;

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery<SuccessResponseFilterProducts, ErrorResponse>({
    queryKey: QUERY_KEYS.products.listBase(),
    initialPageParam: targetPage,
    queryFn: async ({ pageParam = 1 }) => {
      const safePage = z.number().int().min(1).parse(pageParam);
      const queryString = productsModel.getFilterParams({ ...filters, limit: LIMIT, page: safePage });
      return productsApi.getProductsFiltered(queryString, safePage, LIMIT);
    },
    getNextPageParam: productsModel.getNextPageParam,
    refetchOnMount: true,
  });

  const products = useMemo(() => productsModel.flattenProductsPages(data?.pages), [data?.pages]);
  return {
    products,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    refetch,
  };
}
