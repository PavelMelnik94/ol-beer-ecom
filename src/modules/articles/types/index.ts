interface ArticleTag {
  id: string;
  name: string;
}

interface Author {
  id: string,
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface Article {
  id: string;
  title: string;
  shortDescription: string;
  image: string;
  author: Author,
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  likedByUserIds: string[] | []

  tags: ArticleTag[]
}

export interface ArticleDetails extends Article {
  longDescription: string;
}

export interface LikeResponse {
  liked: boolean;
  like: {
    id: string
    userId: string
    createdAt: string
  }
}

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

export interface CommentMutation {
  type: 'CREATE' | 'UPDATE' | 'DELETE' | 'LIKE';
  payload: any;
  optimisticId?: string;
}
