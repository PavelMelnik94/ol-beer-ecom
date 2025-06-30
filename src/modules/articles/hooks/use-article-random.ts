import type { ApiErrorResponse, ApiSuccessResponse } from '@kernel/index';
import { API_ENDPOINTS, apiClient, queryKeys } from '@kernel/index'
import { useQuery } from '@tanstack/react-query'
import { getRandomFromArray } from '@shared/utils';
import type { Article } from '../types'
import { useArticleTags } from './use-article-tags';

type SuccessResponse = ApiSuccessResponse<Article[]>;
type ErrorResponse = ApiErrorResponse;

export function useArticlesRandom() {
  const { tagList } = useArticleTags()

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<SuccessResponse, ErrorResponse>({
    queryKey: queryKeys.articles.random(),
    queryFn: () =>
      apiClient.get(`${API_ENDPOINTS.articles.all}?limit=${1}&tags=${getRandomFromArray(tagList || [])?.name}`),
  })

  return {
    article: data?.data[0],
    isLoading,
    isError,
    error,
    getRelatedArticle: refetch,
  }
}
