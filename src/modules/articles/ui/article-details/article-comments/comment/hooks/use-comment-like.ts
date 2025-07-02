import type { ApiErrorResponse, ApiSuccessResponse } from '@kernel/index';
import type { Comment } from '../../../../../types';
import { API_ENDPOINTS, apiClient, queryClient, queryKeys } from '@kernel/index';
import { getIsLiked } from '@modules/articles/model';
import { useOptimistic } from '@shared/hooks';
import { useMutation } from '@tanstack/react-query';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useMemo } from 'react';
import { useArticleStore } from '../../../../../stores/article-store';

type SuccessResponse = ApiSuccessResponse<Comment>;
type ErrorResponse = ApiErrorResponse;

interface LikeState {
  isLiked: boolean;
  likeCounter: number;
}

export function useCommentLike(comment: Comment) {
  const articleId = useArticleStore(store => store.articleId)
  const [page] = useQueryState('commentPage', parseAsInteger)

  const baseState = useMemo<LikeState>(() => ({
    isLiked: getIsLiked(comment.likedByUserIds),
    likeCounter: comment.likesCount,
  }), [comment]);

  const { optimisticValue, addOptimistic, rollback } = useOptimistic(baseState);

  const { mutateAsync: likeComment } = useMutation<SuccessResponse, ErrorResponse>({
    mutationKey: queryKeys.articles.commentLike(comment.id),
    mutationFn: () => apiClient.post(`${API_ENDPOINTS.articles.commentLike(comment.id)}`),
    onSuccess: async (res) => {
      if (res.success) {
        await queryClient.invalidateQueries({
          queryKey: queryKeys.articles.commentList(articleId + page),
        });
      }
      else {
        rollback();
      }
    },
    onMutate: () => {
      addOptimistic(prevState => ({
        isLiked: !prevState.isLiked,
        likeCounter: prevState.isLiked
          ? prevState.likeCounter - 1
          : prevState.likeCounter + 1,
      }));
    },
    onError: () => {
      rollback();
    },
  });

  return {
    likeComment,
    likeCounter: optimisticValue.likeCounter,
    isLiked: optimisticValue.isLiked,
  }
}
