import type { ApiErrorResponse, ApiSuccessResponse } from '@kernel/index';
import type { Article } from '../../../types';
import { API_ENDPOINTS, apiClient, queryKeys } from '@kernel/index';
import { useQuery } from '@tanstack/react-query';

type SuccessResponse = ApiSuccessResponse<Article>;
type ErrorResponse = ApiErrorResponse;

export function useArticlesRandom(excludeId: string) {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<SuccessResponse, ErrorResponse>({
    queryKey: queryKeys.articles.articleRandom(excludeId),
    queryFn: () =>
      apiClient.get(`${API_ENDPOINTS.articles.randomArticle(excludeId)}`),
  })

  return {
    article: data?.data,
    isLoading,
    isError,
    error,
  } as const;
}
