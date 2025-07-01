import { API_ENDPOINTS, type ApiErrorResponse, type ApiSuccessResponse, apiClient, queryClient, queryKeys } from '@kernel/index';
import { useMutation } from '@tanstack/react-query';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useArticleStore } from '../../../../../stores/article-store';
import type { Comment } from '../../../../../types';

type SuccessResponse = ApiSuccessResponse<Comment>;
type ErrorResponse = ApiErrorResponse;

export function useCommentLike(comment: Comment) {
    const articleId = useArticleStore(store => store.articleId)
    const [page] = useQueryState('commentPage', parseAsInteger)

    const { mutateAsync: likeComment } = useMutation<SuccessResponse, ErrorResponse>({
        mutationKey: queryKeys.articles.commentLike(comment.id),
        mutationFn: () => apiClient.post(`${API_ENDPOINTS.articles.commentLike(comment.id)}`),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.articles.commentList(articleId + page),
            });
        },
    });

    return {
        likeComment,
    }
}
