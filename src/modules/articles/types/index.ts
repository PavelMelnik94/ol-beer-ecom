interface ArticleTag {
  id: string;
  name: string;
}

export interface Article {
  id: string;
  title: string;
  shortDescription: string;
  image: string;
  author: {
    id: string,
    firstName: string;
    lastName: string;
    avatar: string;
  },
  likesCount: number;
  commentsCount: number;
  createdAt: string;

  tags: ArticleTag[]
}
