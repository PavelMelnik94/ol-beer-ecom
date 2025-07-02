import type { ApiErrorResponse, ApiSuccessResponse, ApiSuccessResponsePaginated } from '@kernel/index';
import type {
  Comment,
  CommentCreateRequest,
  CommentDeleteRequest,
  CommentLikeRequest,
  CommentUpdateRequest,
  OptimisticComment,
} from '../types';
import { API_ENDPOINTS, apiClient, queryClient, queryKeys } from '@kernel/index';

import { useAuthStore } from '@modules/auth';
import { useOptimistic } from '@shared/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';

import { useArticleStore } from '../stores/article-store';

type CommentsResponse = ApiSuccessResponsePaginated<Comment>;
type CommentResponse = ApiSuccessResponse<Comment>;
type ErrorResponse = ApiErrorResponse;

interface UseCommentsProps {
  page?: number;
}

export function useComments({ page = 1 }: UseCommentsProps = {}) {
  const articleId = useArticleStore(state => state.articleId);
  const currentUser = useAuthStore(state => state.user);
  const {
    commentsState,
    setComments,
    setPagination,
    setCommentsLoading,
  } = useArticleStore();

  const {
    data: commentsData,
    isLoading: isQueryLoading,
    error: queryError,
    refetch,
  } = useQuery<CommentsResponse, ErrorResponse>({
    queryKey: queryKeys.articles.commentList(articleId, page),
    queryFn: () => apiClient.get(`${API_ENDPOINTS.articles.comments(articleId)}?page=${page}`),
    enabled: !!articleId,

  });

  const {
    optimisticValue: optimisticComments,
    addOptimistic,
    rollback,
    confirm,
    isPending,
  } = useOptimistic<OptimisticComment[]>(commentsState.comments);

  useEffect(() => {
    if (commentsData?.data) {
      const comments: OptimisticComment[] = commentsData.data.map(comment => ({
        ...comment,
        isOptimistic: false,
      }));

      setComments(comments);
      setPagination({
        page: commentsData.pagination.page,
        totalPages: commentsData.pagination.totalPages,
      });
    }
  }, [commentsData, setComments, setPagination]);

  useEffect(() => {
    setCommentsLoading(isQueryLoading);
  }, [isQueryLoading, setCommentsLoading]);

  const invalidateCommentsQueries = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.articles.commentListAll(articleId),
      exact: false,
    });

    queryClient.invalidateQueries({
      queryKey: queryKeys.articles.detail(articleId),
    });
  }, [articleId]);

  const createCommentMutation = useMutation<CommentResponse, ErrorResponse, CommentCreateRequest>({
    mutationFn: data => apiClient.post(`${API_ENDPOINTS.articles.commentCreate(articleId)}`, data),
    onSuccess: (response) => {
      if (response.success) {
        confirm();
        toast.success(response.message || 'Comment created successfully');
        invalidateCommentsQueries();
      }
    },
    onError: (error) => {
      rollback();
      toast.error(error.message || 'Error creating comment');
    },
  });

  const updateCommentMutation = useMutation<CommentResponse, ErrorResponse, CommentUpdateRequest>({
    mutationFn: ({ id, content }) =>
      apiClient.put(`${API_ENDPOINTS.articles.commentEdit(id)}`, { content }),
    onSuccess: (response) => {
      if (response.success) {
        confirm();
        toast.success(response.message || 'Comment updated successfully');
        invalidateCommentsQueries();
      }
    },
    onError: (error) => {
      rollback();
      toast.error(error.message || 'Error updating comment');
    },
  });

  const deleteCommentMutation = useMutation<CommentResponse, ErrorResponse, CommentDeleteRequest>({
    mutationFn: ({ id }) => apiClient.delete(`${API_ENDPOINTS.articles.commentDelete(id)}`),
    onSuccess: async (response) => {
      confirm();
      toast.success(response.message || 'Comment deleted successfully');

      invalidateCommentsQueries();

      await refetch();
    },
    onError: (error) => {
      rollback();
      toast.error(error.message || 'Error deleting comment');
    },
  });

  const likeCommentMutation = useMutation<CommentResponse, ErrorResponse, CommentLikeRequest>({
    mutationFn: ({ id }) => apiClient.post(`${API_ENDPOINTS.articles.commentLike(id)}`),
    onSuccess: (response) => {
      if (response.success) {
        confirm();
        invalidateCommentsQueries();
      }
    },
    onError: (error) => {
      rollback();
      toast.error(error.message || 'Error liking comment');
    },
  });

  const createComment = useCallback(async (content: string) => {
    if (!content.trim() || !currentUser) return;

    const optimisticId = `temp-${Date.now()}`;
    const optimisticComment: OptimisticComment = {
      id: optimisticId,
      content: content.trim(),
      author: {
        id: currentUser.id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        avatar: currentUser.avatar || '',
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likesCount: 0,
      likedByUserIds: [],
      isOptimistic: true,
      isPending: false,
    };

    addOptimistic(comments => [optimisticComment, ...comments]);

    await createCommentMutation.mutateAsync({ content: content.trim() });
  }, [addOptimistic, createCommentMutation, currentUser]);

  const updateComment = useCallback(async (id: string, content: string) => {
    if (!content.trim()) return;

    addOptimistic(comments =>
      comments.map(comment =>
        comment.id === id
          ? { ...comment, content: content.trim(), isPending: true }
          : comment,
      ),
    );

    await updateCommentMutation.mutateAsync({ id, content });
  }, [addOptimistic, updateCommentMutation]);

  const deleteComment = useCallback(async (id: string) => {
    addOptimistic((comments) => {
      const filteredComments = comments.filter(comment => comment.id !== id);
      console.warn('📊 Comments after optimistic delete:', {
        before: comments.length,
        after: filteredComments.length,
        currentPage: page,
      });
      return filteredComments;
    });

    await deleteCommentMutation.mutateAsync({ id });
  }, [addOptimistic, deleteCommentMutation, page]);

  const likeComment = useCallback(async (id: string) => {
    if (!currentUser) return;

    addOptimistic(comments =>
      comments.map((comment) => {
        if (comment.id === id) {
          const isLiked = (comment.likedByUserIds as string[]).includes(currentUser.id);
          return {
            ...comment,
            likesCount: isLiked ? comment.likesCount - 1 : comment.likesCount + 1,
            likedByUserIds: isLiked
              ? (comment.likedByUserIds as string[]).filter(userId => userId !== currentUser.id)
              : [...(comment.likedByUserIds as string[]), currentUser.id],
            isPending: false,
          };
        }
        return comment;
      }),
    );

    await likeCommentMutation.mutateAsync({ id });
  }, [addOptimistic, likeCommentMutation, currentUser]);

  console.log(optimisticComments, commentsState.comments, '[...optimisticComments, ...commentsState.comments]')
  return {
    // data
    comments: [...optimisticComments, ...commentsState.comments],
    pagination: commentsState.pagination,

    // states loading
    isLoading: commentsState.isLoading || isPending,
    isCreating: createCommentMutation.isPending,
    isUpdating: updateCommentMutation.isPending,
    isDeleting: deleteCommentMutation.isPending,
    isLiking: likeCommentMutation.isPending,

    // errors
    error: queryError,

    // pagination
    shouldGoToPrevPage: (() => {
      const currentData = commentsData?.data;
      const optimisticCommentsCount = optimisticComments?.length || 0;

      const shouldGo = (currentData?.length === 0 || optimisticCommentsCount === 0)
        && page > 1
        && !isQueryLoading;

      return shouldGo;
    })(),

    // actions
    createComment,
    updateComment,
    deleteComment,
    likeComment,
    refetch,

    // additional methods
    rollback,
    confirm,
  };
}
