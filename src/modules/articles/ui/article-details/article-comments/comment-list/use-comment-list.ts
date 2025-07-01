import type { ApiErrorResponse, ApiSuccessResponsePaginated } from '@kernel/index';
import { API_ENDPOINTS, apiClient, queryKeys } from '@kernel/index';
import { useArticleStore } from '@modules/articles/stores/article-store';
import type { Comment } from '@modules/articles/types';
import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, useQueryState } from 'nuqs';

type SuccessResponse = ApiSuccessResponsePaginated<Comment>;
type ErrorResponse = ApiErrorResponse;

export function useCommentList() {
  const articleId = useArticleStore(store => store.articleId)
  const [page = '1', setPage] = useQueryState('commentPage', parseAsInteger)
  const { data: response, error, isLoading } = useQuery<SuccessResponse, ErrorResponse>({

    queryKey: queryKeys.articles.commentList(articleId + page),
    queryFn: () => apiClient.get(`${API_ENDPOINTS.articles.comments(articleId)}?page=${page ?? '1'}`),
    enabled: !!articleId,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return {
    commentList: response?.data ?? [],
    isLoading,
    error,
    onChangePage: setPage,
    currentPage: page,
    totalPages: response?.pagination.totalPages,
  }
}
