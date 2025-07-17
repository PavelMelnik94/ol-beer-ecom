import type { ApiErrorResponse, ApiSuccessResponse, ApiSuccessResponsePaginated } from '@kernel/index';

import type {
  Comment,
  CommentCreateRequest,
  CommentDeleteRequest,
  CommentLikeRequest,
  CommentsApi,
  CommentUpdateRequest,
  OptimisticComment,
} from '../types';
import { normalizeAvatarUrl, QUERY_KEYS, queryClient, toast, useUserStore } from '@kernel/index';
import { useCommentStore } from '@modules/comments/stores/comment-store';

import { useOptimistic } from '@shared/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { clone } from 'lodash-es';
import { useCallback, useEffect } from 'react';
import { commentsModel } from '../model';

type CommentsResponse = ApiSuccessResponsePaginated<Comment>;
type CommentResponse = ApiSuccessResponse<Comment>;
type ErrorResponse = ApiErrorResponse;

interface UseCommentsProps {
  page?: number;
  parentId: string;
  queryKey: (string | number)[];
  api: CommentsApi;
}

export function useComments({
  page = 1,
  parentId,
  api,
  queryKey,
}: UseCommentsProps) {
  const currentUser = useUserStore(s => s.profile);
  const {
    commentsState,
    setComments,
    setPagination,
    setCommentsLoading,
  } = useCommentStore();

  const {
    data: commentsData,
    isLoading: isQueryLoading,
    error: queryError,
    refetch,
  } = useQuery<CommentsResponse, ErrorResponse>({
    queryKey,
    queryFn: () => api.getComments(parentId, page),
    enabled: !!parentId,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: false,
    select: (response) => {
      if (response.success && response.data) {
        return {
          ...response,
          data: commentsModel.normalizeComments(response.data),
        };
      }
      return response;
    },
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
    if (parentId) {
      void refetch();
    }
  }, [parentId, refetch]);

  useEffect(() => {
    setCommentsLoading(isQueryLoading);
  }, [isQueryLoading, setCommentsLoading]);

  const invalidateCommentsQueries = useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.articles.commentListAll(parentId),
      exact: false,
    });

    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.products.commentListAll(parentId),
      exact: false,
    });

    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.articles.detail(parentId),
    });

    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.products.detail(parentId),
    });

    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.user.profile(),
    });
  }, [parentId]);

  const createCommentMutation = useMutation<CommentResponse, ErrorResponse, CommentCreateRequest>({
    mutationFn: data => api.createComment(parentId, data),
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
    mutationFn: ({ id, content }) => api.updateComment(id, content),
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
    mutationFn: ({ id }) => api.deleteComment(id),
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
    mutationFn: ({ id }) => api.likeComment(id),
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
    comments: optimisticComments.length ? optimisticComments : commentsState.comments,
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
      isQueryLoading,
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
