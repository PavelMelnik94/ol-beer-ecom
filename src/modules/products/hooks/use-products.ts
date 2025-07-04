import type { ErrorResponse, SuccessResponseFilterProducts } from '@modules/products/api';
import type { Filters } from '../model';
import { QUERY_KEYS } from '@kernel/index';
import { productsApi } from '@modules/products/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import z from 'zod';
import { productsModel } from '../model';

const LIMIT = 25;
export function useProductsInfinite({ filterParams }: { filterParams: Filters; }) {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery<SuccessResponseFilterProducts, ErrorResponse>({
    queryKey: QUERY_KEYS.articles.articleList(),
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => {
      const page = z.coerce.number().parse(pageParam);
      const queryString = productsModel.getFilterParams(filterParams);

      return productsApi.getProductsFiltered(queryString, page, LIMIT);
    },
    getNextPageParam: productsModel.getNextPageParam,
  });

  const products = productsModel.flattenProductsPages(data?.pages);

  return {
    products,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  };
}
