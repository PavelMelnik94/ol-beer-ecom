import { API_ENDPOINTS, type ApiErrorResponse, type ApiSuccessResponse, apiClient, queryClient, queryKeys } from '@kernel/index';
import type { ArticleDetails } from '@modules/articles/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

type SuccessResponse = ApiSuccessResponse<ArticleDetails>;
type ErrorResponse = ApiErrorResponse;

export function useLikePost(id: string) {
  const { mutateAsync } = useMutation<SuccessResponse, ErrorResponse>({
    mutationKey: queryKeys.articles.like(id),
    mutationFn: () => apiClient.post(`${API_ENDPOINTS.articles.like(id)}`),
  });

  const likePost = async () => {
    const res = await mutateAsync()

    if (res.success) {
      queryClient.invalidateQueries({
        queryKey: queryKeys.articles.detail(id),
      });
      toast('Thank you, the author will be very pleased!')
    }
  };

  return {
    likePost,
  }
}
