import { API_ENDPOINTS, type ApiErrorResponse, type ApiSuccessResponse, apiClient, queryClient, queryKeys } from '@kernel/index';
import type { ArticleDetails } from '@modules/articles/types';
import { useMutation } from '@tanstack/react-query';

type SuccessResponse = ApiSuccessResponse<ArticleDetails>;
type ErrorResponse = ApiErrorResponse;

export function useLikePost(id: string) {
  const { mutateAsync } = useMutation<SuccessResponse, ErrorResponse>({
    mutationKey: queryKeys.articles.like(id),
    mutationFn: () => apiClient.post(`${API_ENDPOINTS.articles.like(id)}`),
  });

  const likePost = async () => {
    await mutateAsync()
    queryClient.invalidateQueries({
      queryKey: queryKeys.articles.detail(id),
    });
  };

  return {
    likePost,
  }
}
