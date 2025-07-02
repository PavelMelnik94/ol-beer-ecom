import {  queryKeys } from '@kernel/index';
import { useQuery } from '@tanstack/react-query';
import { articleApi, type ErrorResponse, type SuccessResponseRandomArticle } from '@modules/articles/api/article-api';

export function useArticlesRandom(excludeId: string) {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<SuccessResponseRandomArticle, ErrorResponse>({
    queryKey: queryKeys.articles.articleRandom(excludeId),
    queryFn:  () => articleApi.getRandomArticle(excludeId),
  })

  return {
    article: data?.data,
    isLoading,
    isError,
    error,
  } as const;
}
