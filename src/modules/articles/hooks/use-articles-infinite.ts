import type { ApiErrorResponse, ApiSuccessResponsePaginated } from '@kernel/index';
import type { Article } from '../types';
import { API_ENDPOINTS, apiClient, QUERY_KEYS } from '@kernel/index';
import { useInfiniteQuery } from '@tanstack/react-query';
import { articlesModel } from '../model';

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
    queryKey: QUERY_KEYS.articles.articleList(),
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      apiClient.get(`${API_ENDPOINTS.articles.all}?limit=${limit}&page=${pageParam}`),
    getNextPageParam: articlesModel.getNextPageParam,
  });

  const articles = articlesModel.flattenArticlesPages(data?.pages);

  return {
    articles,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  };
}
