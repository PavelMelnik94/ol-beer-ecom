import { API_ENDPOINTS, type ApiErrorResponse, type ApiSuccessResponse, apiClient, queryKeys } from '@kernel/index';
import type { Comment } from '@modules/articles/types';
import { useQuery } from '@tanstack/react-query';

type SuccessResponse = ApiSuccessResponse<Comment>;
type ErrorResponse = ApiErrorResponse;

export function useCommentList(id: string) {
  const { data: response, error, isLoading } = useQuery<SuccessResponse, ErrorResponse>({
    queryKey: queryKeys.articles.comments(id),
    queryFn: () => apiClient.get(`${API_ENDPOINTS.articles.comments(id)}`),
    enabled: !!id,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return {
    commentList: response?.data ?? [],
    isLoading,
    error,
  }
}
