import type { ApiErrorResponse, ApiSuccessResponse } from '@kernel/index';
import { API_ENDPOINTS, apiClient, queryClient, queryKeys } from '@kernel/index';
import type { LikeResponse } from '@modules/articles/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useArticleStore } from '../stores/article-store';

type SuccessResponse = ApiSuccessResponse<LikeResponse>;
type ErrorResponse = ApiErrorResponse;

export function useLikeArticle() {
  const articleId = useArticleStore(store => store.articleId)

  const { mutateAsync } = useMutation<SuccessResponse, ErrorResponse>({
    mutationKey: queryKeys.articles.articleLike(articleId),
    mutationFn: () => apiClient.post(`${API_ENDPOINTS.articles.articleLike(articleId)}`),
  });

  const likeArticle = async () => {
    const res = await mutateAsync()

    if (res.success) {
      queryClient.invalidateQueries({
        queryKey: queryKeys.articles.detail(articleId),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.articles.all,
      });

      if (res.data.liked) {
        toast('Thank you, the author will be very pleased! 🙏')
      }
    }
  };

  return {
    likeArticle,
  }
}
