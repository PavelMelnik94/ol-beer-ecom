import { API_ENDPOINTS, type ApiErrorResponse, type ApiSuccessResponsePaginated, apiClient, queryKeys } from '@kernel/index';
import type { Comment } from '@modules/articles/types';
import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, useQueryState } from 'nuqs';

type SuccessResponse = ApiSuccessResponsePaginated<Comment>;
type ErrorResponse = ApiErrorResponse;

export function useCommentList(id: string) {
  const [page = '1', setPage] = useQueryState('commentPage', parseAsInteger)
  const { data: response, error, isLoading } = useQuery<SuccessResponse, ErrorResponse>({

    queryKey: queryKeys.articles.comments(id + page),
    queryFn: () => apiClient.get(`${API_ENDPOINTS.articles.comments(id)}?page=${page ?? '1'}`),
    enabled: !!id,
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
