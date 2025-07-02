import type { Author } from '@kernel/types';

export interface Comment {
  likedByUserIds: string[] | []
  author: Author
  content: string;
  createdAt: string;
  id: string
  likesCount: number;
  updatedAt: string
}

interface CommentAction {
  withDelete: boolean;
  withEdit: boolean;
  withLike: boolean;
}

export type CommentsActions = Record<string, CommentAction>

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

