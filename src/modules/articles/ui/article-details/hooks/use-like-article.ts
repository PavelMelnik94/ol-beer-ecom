import type { ApiErrorResponse, ApiSuccessResponse } from '@kernel/index';
import type { LikeResponse } from '@modules/articles/types';
import { API_ENDPOINTS, apiClient, queryClient, queryKeys } from '@kernel/index';
import { useArticleStore } from '@modules/articles/stores/article-store';
import { useOptimistic } from '@shared/hooks';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { toast } from 'sonner';

type SuccessResponse = ApiSuccessResponse<LikeResponse>;
type ErrorResponse = ApiErrorResponse;

interface LikeState {
  isLiked: boolean;
  likeCounter: number;
}

interface UseLikeArticleProps {
  initialIsLiked: boolean;
  initialLikesCount: number;
}

export function useLikeArticle({ initialIsLiked, initialLikesCount }: UseLikeArticleProps) {
  const articleId = useArticleStore(store => store.articleId);

  const baseState = useMemo<LikeState>(() => ({
    isLiked: initialIsLiked,
    likeCounter: initialLikesCount,
  }), [initialIsLiked, initialLikesCount]);

  const { optimisticValue, addOptimistic, rollback, isPending } = useOptimistic(baseState);

  const { mutateAsync } = useMutation<SuccessResponse, ErrorResponse>({
    mutationKey: queryKeys.articles.articleLike(articleId),
    mutationFn: () => apiClient.post(`${API_ENDPOINTS.articles.articleLike(articleId)}`),
  });

  const likeArticle = useCallback(async () => {
    try {
      addOptimistic(prevState => ({
        isLiked: !prevState.isLiked,
        likeCounter: prevState.isLiked
          ? prevState.likeCounter - 1
          : prevState.likeCounter + 1,
      }));

      const response = await mutateAsync();

      if (response.success) {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: queryKeys.articles.detail(articleId),
          }),
          queryClient.invalidateQueries({
            queryKey: queryKeys.articles.all,
          }),
        ]);

        if (response.data.liked) {
          toast('Thank you, the author will be very pleased! 🙏');
        }
      }
      else {
        rollback();
        toast.error(response.message);
      }
    }
    catch (error) {
      rollback();
      toast.error('Error occurred while liking article');
      console.error('Like article error:', error);
    }
  }, [addOptimistic, mutateAsync, rollback, articleId]);

  return {
    likeArticle,
    isLiked: optimisticValue.isLiked,
    likeCounter: optimisticValue.likeCounter,
    isPending,
  } as const;
}
