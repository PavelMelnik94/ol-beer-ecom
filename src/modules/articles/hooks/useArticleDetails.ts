import { API_ENDPOINTS, type ApiErrorResponse, type ApiSuccessResponse, apiClient, queryKeys } from '@kernel/index';
import type { ArticleDetails } from '@modules/articles/types';
import { useQuery } from '@tanstack/react-query';

type SuccessResponse = ApiSuccessResponse<ArticleDetails>;
type ErrorResponse = ApiErrorResponse;

export function useArticlesDetails(id: string) {
  const { data: response, error, isLoading } = useQuery<SuccessResponse, ErrorResponse>({
    queryKey: queryKeys.articles.detail(id),
    queryFn: () => apiClient.get(`${API_ENDPOINTS.articles.details}/${id}`),
    enabled: !!id,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return {
    article: response?.data,
    isLoading,
    error,
  }
}
