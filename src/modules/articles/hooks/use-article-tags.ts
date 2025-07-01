import type { ApiErrorResponse, ApiSuccessResponse } from '@kernel/index';
import type { Article } from '../types'
import { API_ENDPOINTS, apiClient, queryKeys } from '@kernel/index'
import { useQuery } from '@tanstack/react-query'

type SuccessResponse = ApiSuccessResponse<Article['tags']>;
type ErrorResponse = ApiErrorResponse;

export function useArticleTags() {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<SuccessResponse, ErrorResponse>({
    queryKey: queryKeys.articles.tags(),
    queryFn: () =>
      apiClient.get(`${API_ENDPOINTS.articles.tags}`),

  })

  return {
    tagList: data?.data,
    isLoading,
    isError,
    error,
  }
}
