export const QUERY_KEYS = {

  articles: {
    all: ['articles'] as const,
    articleList: () => [...QUERY_KEYS.articles.all, 'list'] as const,
    articleTags: () => [...QUERY_KEYS.articles.all, 'tags'] as const,
    articleListFilters: (filters: Record<string, any>) => [...QUERY_KEYS.articles.articleList(), filters] as const,
    articleDetails: () => [...QUERY_KEYS.articles.all, 'detail'] as const,
    detail: (id: number | string) => [...QUERY_KEYS.articles.articleDetails(), id] as const,
    articleRandom: (id: string) => [...QUERY_KEYS.articles.all, 'random', id] as const,
    articleLike: (id: number | string) => [...QUERY_KEYS.articles.detail(id), 'like'] as const,
    commentListAll: (articleId: number | string) => ['articles', articleId, 'comments'] as const,
  },

  comments: {
    all: ['comments'] as const,
    comment: (commentId: number | string) => [...QUERY_KEYS.comments.all, commentId] as const,
    commentEdit: (commentId: number | string) => [...QUERY_KEYS.comments.comment(commentId), 'edit'] as const,
    commentDelete: (commentId: number | string) => [...QUERY_KEYS.comments.comment(commentId), 'delete'] as const,
    commentLike: (commentId: number | string) => [...QUERY_KEYS.comments.comment(commentId), 'like'] as const,
  },

  breweries: {
    all: ['breweries'] as const,
    lists: () => [...QUERY_KEYS.breweries.all, 'list'] as const,
  },

  beers: {
    all: ['beers'] as const,
    lists: () => [...QUERY_KEYS.beers.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...QUERY_KEYS.beers.lists(), filters] as const,
    details: () => [...QUERY_KEYS.beers.all, 'detail'] as const,
    detail: (id: number) => [...QUERY_KEYS.beers.details(), id] as const,
    random: () => [...QUERY_KEYS.beers.all, 'random'] as const,
  },

  auth: {
    all: ['auth'] as const,
    login: () => [...QUERY_KEYS.auth.all, 'login'] as const,
    register: () => [...QUERY_KEYS.auth.all, 'register'] as const,
  },

  user: {
    all: ['user'] as const,
    profile: () => [...QUERY_KEYS.user.all, 'profile'] as const,
    addresses: () => [...QUERY_KEYS.user.all, 'addresses'] as const,
  },
} as const;

export type QueryKeys = typeof QUERY_KEYS;
