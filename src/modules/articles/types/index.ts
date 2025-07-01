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
