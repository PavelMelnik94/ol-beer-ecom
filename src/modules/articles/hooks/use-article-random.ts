import type { ErrorResponse, SuccessResponseRandomArticle } from '@modules/articles/api/article-api';
import { QUERY_KEYS } from '@kernel/index';
import { articleApi } from '@modules/articles/api/article-api';
import { useQuery } from '@tanstack/react-query';

export function useArticlesRandom(excludeId: string) {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<SuccessResponseRandomArticle, ErrorResponse>({
    queryKey: QUERY_KEYS.articles.articleRandom(excludeId),
    queryFn: () => articleApi.getRandomArticle(excludeId),
  });

  return {
    article: data?.data,
    isLoading,
    isError,
    error,
  } as const;
}
