import type { ApiErrorResponse, ApiSuccessResponse } from '@kernel/index';
import type { ArticleDetails } from '@modules/articles/types';
import { API_ENDPOINTS, apiClient, queryKeys } from '@kernel/index';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useArticleStore } from '../../../stores/article-store';

type SuccessResponse = ApiSuccessResponse<ArticleDetails>;
type ErrorResponse = ApiErrorResponse;

export function useArticlesDetails(id: string) {
  const { data: response, error, isLoading } = useQuery<SuccessResponse, ErrorResponse>({
    queryKey: queryKeys.articles.detail(id),
    queryFn: () => apiClient.get(`${API_ENDPOINTS.articles.articleDetails(id)}`),
    enabled: !!id,
  });

  useEffect(() => {
    useArticleStore.getState().setArticleId(id);
  }, [id]);

  return {
    article: response?.data,
    isLoading,
    error,
  } as const;
}
