import type { ApiErrorResponse, ApiSuccessResponse } from '@kernel/index';
import { API_ENDPOINTS, apiClient, queryKeys } from '@kernel/index';
import { useQuery } from '@tanstack/react-query';
import { useArticleStore } from '../../../stores/article-store';
import type { Article } from '../../../types';

type SuccessResponse = ApiSuccessResponse<Article>;
type ErrorResponse = ApiErrorResponse;

export function useArticlesRandom() {
  const articleId = useArticleStore(store => store.articleId)
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<SuccessResponse, ErrorResponse>({
    queryKey: queryKeys.articles.articleRandom(articleId),
    queryFn: () =>
      apiClient.get(`${API_ENDPOINTS.articles.randomArticle(articleId)}`),
  })

  return {
    article: data?.data,
    isLoading,
    isError,
    error,
  }
}
