import type { ErrorResponse, SuccessResponseRandomArticle } from '@modules/articles/api/article-api';
import { queryKeys } from '@kernel/index';
import { articleApi } from '@modules/articles/api/article-api';
import { useQuery } from '@tanstack/react-query';

export function useArticlesRandom(excludeId: string) {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery<SuccessResponseRandomArticle, ErrorResponse>({
    queryKey: queryKeys.articles.articleRandom(excludeId),
    queryFn: () => articleApi.getRandomArticle(excludeId),
  });

  return {
    article: data?.data,
    isLoading,
    isError,
    error,
  } as const;
}
