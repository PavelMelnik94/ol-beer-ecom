import type { ApiErrorResponse, ApiSuccessResponsePaginated } from '@kernel/index';
import { API_ENDPOINTS, apiClient, queryKeys } from '@kernel/index';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { Article } from '../types';

type SuccessResponse = ApiSuccessResponsePaginated<Article>;
type ErrorResponse = ApiErrorResponse;

const limit = 5;
export function useArticlesInfinite() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery<SuccessResponse, ErrorResponse>({
    queryKey: queryKeys.articles.articleList(),
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      apiClient.get(`${API_ENDPOINTS.articles.all}?limit=${limit}&page=${pageParam}`),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.pagination;
      return page < totalPages ? page + 1 : undefined;
    },
  })

  const articles = data?.pages.flatMap(page => page.data) ?? []

  return {
    articles,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  }
}
