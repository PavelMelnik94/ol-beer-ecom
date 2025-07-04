import type { ApiSuccessResponse, ApiSuccessResponsePaginated } from '@kernel/api';
import type { Author } from '@kernel/types';

export interface Comment {
  likedByUserIds: string[] | [];
  author: Author;
  content: string;
  createdAt: string;
  id: string;
  likesCount: number;
  updatedAt: string;
}

interface CommentAction {
  withDelete: boolean;
  withEdit: boolean;
  withLike: boolean;
}

export type CommentsActions = Record<string, CommentAction>;

// Типы для централизованного управления комментариями
export interface CommentCreateRequest {
  content: string;
}

export interface CommentUpdateRequest {
  id: string;
  content: string;
}

export interface CommentLikeRequest {
  id: string;
}

export interface CommentDeleteRequest {
  id: string;
}

// Типы для optimistic updates
export interface OptimisticComment extends Comment {
  isOptimistic?: boolean;
  isPending?: boolean;
}

export interface CommentsState {
  comments: OptimisticComment[];
  pagination: {
    page: number;
    totalPages: number;
  };
  isLoading: boolean;
}

export interface CommentsApi {
  getComments: (id: string, page: number) => Promise<ApiSuccessResponsePaginated<Comment>>;
  createComment: (id: string, data: CommentCreateRequest) => Promise<ApiSuccessResponse<Comment>>;
  updateComment: (id: string, content: string) => Promise<ApiSuccessResponse<Comment>>;
  deleteComment: (id: string) => Promise<ApiSuccessResponse<Comment>>;
  likeComment: (id: string) => Promise<ApiSuccessResponse<Comment>>;
}
