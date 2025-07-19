import type { ErrorResponse, SuccessResponseArticleLike } from '@modules/articles/api/article-api';
import { QUERY_KEYS, queryClient, toast } from '@kernel/index';
import { articleApi } from '@modules/articles/api/article-api';
import { useArticleStore } from '@modules/articles/stores/article-store';
import { useOptimistic } from '@shared/hooks';
import { useMutation } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { articlesModel } from '../model';

interface LikeState {
  isLiked: boolean;
  likeCounter: number;
}

interface UseLikeArticleProperties {
  initialIsLiked: boolean;
  initialLikesCount: number;
}

export function useLikeArticle({ initialIsLiked, initialLikesCount }: UseLikeArticleProperties) {
  const articleId = useArticleStore(store => store.articleId);

  const baseState = useMemo<LikeState>(() => ({
    isLiked: initialIsLiked,
    likeCounter: initialLikesCount,
  }), [initialIsLiked, initialLikesCount]);

  const { optimisticValue, addOptimistic, rollback, isPending } = useOptimistic(baseState);

  const { mutateAsync } = useMutation<SuccessResponseArticleLike, ErrorResponse>({
    mutationKey: QUERY_KEYS.articles.articleLike(articleId),
    mutationFn: () => articleApi.likeArticle(articleId),
  });

  const likeArticle = useCallback(async () => {
    try {
      addOptimistic(articlesModel.toggleLikeState);

      const response = await mutateAsync();

      if (response.success) {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.articles.detail(articleId),
          }),
          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.articles.all,
          }),

          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.user.profile(),
          }),
        ]);

        if (response.data.liked) {
          toast.success('Thank you, the author will be very pleased! 🙏');
        }
      }
      else {
        rollback();
        toast.error(response.message || 'Error occurred while liking article');
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
