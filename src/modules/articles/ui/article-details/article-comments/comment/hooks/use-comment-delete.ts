import type { ApiErrorResponse, ApiSuccessResponse } from '@kernel/index';
import type { Comment } from '../../../../../types';
import { API_ENDPOINTS, apiClient, queryClient, queryKeys } from '@kernel/index';
import { useMutation } from '@tanstack/react-query';
import { parseAsInteger, useQueryState } from 'nuqs';
import { toast } from 'sonner';
import { useArticleStore } from '../../../../../stores/article-store';

type SuccessResponse = ApiSuccessResponse<Comment>;
type ErrorResponse = ApiErrorResponse;

export function useCommentDelete(comment: Comment) {
  const articleId = useArticleStore(store => store.articleId)
  const [page] = useQueryState('commentPage', parseAsInteger)

  const { mutateAsync: deleteComment } = useMutation<SuccessResponse, ErrorResponse>({
    mutationKey: queryKeys.articles.commentDelete(comment.id),
    mutationFn: () => apiClient.delete(`${API_ENDPOINTS.articles.commentDelete(comment.id)}`),
  });

  const handleDelete = async () => {
    await deleteComment();

    toast.success('Comment deleted successfully')
    queryClient.invalidateQueries({
      queryKey: queryKeys.articles.commentList(articleId + page),
    });
  }

  return {
    deleteComment: handleDelete,
  }
}
