import type { SuccessResponseArticleDetails } from '@modules/articles/api/article-api';
import type { ErrorResponse } from 'react-router-dom';
import { QUERY_KEYS } from '@kernel/index';
import { articleApi } from '@modules/articles/api/article-api';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useArticleStore } from '../stores/article-store';

export function useArticlesDetails(id: string) {
  const { data: response, error, isLoading } = useQuery<SuccessResponseArticleDetails, ErrorResponse>({
    queryKey: QUERY_KEYS.articles.detail(id),
    queryFn: () => articleApi.getArticleDetails(id),
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
