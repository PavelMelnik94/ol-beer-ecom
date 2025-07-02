import type { ApiSuccessResponse, ApiSuccessResponsePaginated, ApiErrorResponse } from '@kernel/index';
import type {
  Comment,
  CommentCreateRequest,
  CommentDeleteRequest,
  CommentLikeRequest,
  CommentUpdateRequest,
  OptimisticComment,
} from '../types';
import { queryClient, queryKeys, useAuthStore } from '@kernel/index';

import { useOptimistic } from '@shared/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';

import { useArticleStore } from '../stores/article-store';
import { commentsModel } from '../model/comments-model';
import { commentsApi } from '../api/comments-api';

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
    queryFn: () => commentsApi.getComments(articleId, page),
    enabled: !!articleId,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: false,
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
      const comments: OptimisticComment[] = commentsModel.mapServerCommentsToOptimistic(commentsData.data);
      setComments(comments);
      setPagination({
        page: commentsData.pagination.page,
        totalPages: commentsData.pagination.totalPages,
      });
    }
  }, [commentsData, setComments, setPagination]);

  useEffect(() => {
    if (articleId) {
      refetch();
    }
  }, [articleId, refetch]);

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
    mutationFn: data => commentsApi.createComment(articleId, data),
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
    mutationFn: ({ id, content }) => commentsApi.updateComment(id, content),
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
    mutationFn: ({ id }) => commentsApi.deleteComment(id),
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
    mutationFn: ({ id }) => commentsApi.likeComment(id),
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
    const optimisticComment = commentsModel.createOptimisticComment(content, currentUser);
    addOptimistic(comments => [optimisticComment, ...comments]);
    await createCommentMutation.mutateAsync({ content: content.trim() });
  }, [addOptimistic, createCommentMutation, currentUser]);

  const updateComment = useCallback(async (id: string, content: string) => {
    if (!content.trim()) return;
    addOptimistic(comments => commentsModel.optimisticUpdateComment(comments, id, content));
    await updateCommentMutation.mutateAsync({ id, content });
  }, [addOptimistic, updateCommentMutation]);

  const deleteComment = useCallback(async (id: string) => {
    addOptimistic(comments => commentsModel.optimisticDeleteComment(comments, id));
    await deleteCommentMutation.mutateAsync({ id });
  }, [addOptimistic, deleteCommentMutation, page]);

  const likeComment = useCallback(async (id: string) => {
    if (!currentUser) return;
    addOptimistic(comments => commentsModel.optimisticLikeComment(comments, id, currentUser.id));
    await likeCommentMutation.mutateAsync({ id });
  }, [addOptimistic, likeCommentMutation, currentUser]);

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
    shouldGoToPrevPage: commentsModel.shouldGoToPrevPage(
      commentsData?.data,
      optimisticComments?.length || 0,
      page,
      isQueryLoading
    ),

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
