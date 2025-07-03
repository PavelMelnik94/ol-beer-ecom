export const queryKeys = {

  articles: {
    all: ['articles'] as const,
    articleList: () => [...queryKeys.articles.all, 'list'] as const,
    articleTags: () => [...queryKeys.articles.all, 'tags'] as const,
    articleListFilters: (filters: Record<string, any>) => [...queryKeys.articles.articleList(), filters] as const,
    articleDetails: () => [...queryKeys.articles.all, 'detail'] as const,
    detail: (id: number | string) => [...queryKeys.articles.articleDetails(), id] as const,
    articleRandom: (id: string) => [...queryKeys.articles.all, 'random', id] as const,
    articleLike: (id: number | string) => [...queryKeys.articles.detail(id), 'like'] as const,
    // Упрощенная структура для комментариев
    commentList: (articleId: number | string, page: number = 1) => ['articles', articleId, 'comments', 'list', page] as const,
    commentListAll: (articleId: number | string) => ['articles', articleId, 'comments'] as const,
  },

  // Отдельная секция для комментариев
  comments: {
    all: ['comments'] as const,
    comment: (commentId: number | string) => [...queryKeys.comments.all, commentId] as const,
    commentEdit: (commentId: number | string) => [...queryKeys.comments.comment(commentId), 'edit'] as const,
    commentDelete: (commentId: number | string) => [...queryKeys.comments.comment(commentId), 'delete'] as const,
    commentLike: (commentId: number | string) => [...queryKeys.comments.comment(commentId), 'like'] as const,
  },

  breweries: {
    all: ['breweries'] as const,
    lists: () => [...queryKeys.breweries.all, 'list'] as const,
  },

  beers: {
    all: ['beers'] as const,
    lists: () => [...queryKeys.beers.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.beers.lists(), filters] as const,
    details: () => [...queryKeys.beers.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.beers.details(), id] as const,
    random: () => [...queryKeys.beers.all, 'random'] as const,
  },

  auth: {
    all: ['auth'] as const,
    login: () => [...queryKeys.auth.all, 'login'] as const,
    register: () => [...queryKeys.auth.all, 'register'] as const,
  },

  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
    addresses: () => [...queryKeys.user.all, 'addresses'] as const,
  },
} as const;

export type QueryKeys = typeof queryKeys;
