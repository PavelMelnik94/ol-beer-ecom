import {  queryKeys } from '@kernel/index';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useArticleStore } from '../../../stores/article-store';
import { articleApi, type SuccessResponseArticleDetails } from '@modules/articles/api/article-api';
import type { ErrorResponse } from 'react-router-dom';


export function useArticlesDetails(id: string) {
  const { data: response, error, isLoading } = useQuery<SuccessResponseArticleDetails, ErrorResponse>({
    queryKey: queryKeys.articles.detail(id),
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
