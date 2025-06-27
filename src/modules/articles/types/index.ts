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

  tags: ArticleTag[]
}

export interface ArticleDetails extends Article {
  longDescription: string;
}

export interface Comment {

  author: Author
  content: string;
  createdAt: string;
  id: string
  likesCount: number;
  updatedAt: string
}
