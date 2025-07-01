import type { ApiErrorResponse, ApiSuccessResponse } from '@kernel/index';
import type { Article } from '../types'
import { API_ENDPOINTS, apiClient, queryKeys } from '@kernel/index'
import { useQuery } from '@tanstack/react-query'

type SuccessResponse = ApiSuccessResponse<Article>;
type ErrorResponse = ApiErrorResponse;

export function useArticlesRandom({ id }: { id: string }) {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<SuccessResponse, ErrorResponse>({
    queryKey: queryKeys.articles.random(id),
    queryFn: () =>
      apiClient.get(`${API_ENDPOINTS.articles.random(id)}`),
  })

  return {
    article: data?.data,
    isLoading,
    isError,
    error,
  }
}
