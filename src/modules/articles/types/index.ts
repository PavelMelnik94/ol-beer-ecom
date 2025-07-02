import type { Author } from '@kernel/types';

interface ArticleTag {
  id: string;
  name: string;
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
