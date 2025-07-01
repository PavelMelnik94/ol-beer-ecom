import { API_ENDPOINTS, type ApiErrorResponse, type ApiSuccessResponse, apiClient, queryClient, queryKeys } from '@kernel/index';
import { useMutation } from '@tanstack/react-query';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useState } from 'react';
import { toast } from 'sonner';
import { useArticleStore } from '../stores/article-store';
import type { Comment } from '../types';

type SuccessResponse = ApiSuccessResponse<Comment>;
type ErrorResponse = ApiErrorResponse;

export function useCommentActions(comment: Comment) {
    const articleId = useArticleStore(store => store.articleId)
    const [currentContent, setCurrentContent] = useState(comment.content || '');
    const [mode, setMode] = useState<'edit' | 'read'>('read');
    const [page] = useQueryState('commentPage', parseAsInteger)

    const { mutateAsync: updateComment, isPending } = useMutation<SuccessResponse, ErrorResponse>({
        mutationKey: queryKeys.articles.commentEdit(comment.id),
        mutationFn: () => apiClient.put(`${API_ENDPOINTS.articles.commentEdit(comment.id)}`, { content: currentContent }),
    });

    const { mutateAsync: deleteComment } = useMutation<SuccessResponse, ErrorResponse>({
        mutationKey: queryKeys.articles.commentDelete(comment.id),
        mutationFn: () => apiClient.delete(`${API_ENDPOINTS.articles.commentDelete(comment.id)}`),
    });

    const handleUpdate = async () => {
        const res = await updateComment();

        if (res.success) {
            toast.success(res.message)
            queryClient.invalidateQueries({
                queryKey: queryKeys.articles.comments(articleId + page),
            });
            setMode('read')
        }
        else {
            toast.error(res.message)
        }
    }

    const handleDelete = async () => {
        await deleteComment();

        toast.success('Comment deleted successfully')
        queryClient.invalidateQueries({
            queryKey: queryKeys.articles.comments(articleId + page),
        });
        setMode('read')
    }

    const setContent = (content: string) => setCurrentContent(content)

    const toggleEditMode = () => {
        setMode(mode === 'edit' ? 'read' : 'edit')
        setCurrentContent(comment.content || '');
    }

    return {
        updateComment: handleUpdate,
        deleteComment: handleDelete,
        isUpdating: isPending,

        isValidValue: currentContent.trim().length > 5,
        updatedValue: currentContent,
        setUpdatedValue: setContent,

        mode,
        toggleMode: toggleEditMode,
    }
}
