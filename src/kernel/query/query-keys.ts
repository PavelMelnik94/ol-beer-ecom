export const queryKeys = {

  articles: {
    all: ['articles'] as const,
    articleList: () => [...queryKeys.articles.all, 'list'] as const,
    articleTags: () => [...queryKeys.articles.all, 'tags'] as const,
    articleListFilters: (filters: Record<string, any>) => [...queryKeys.articles.articleList(), filters] as const,
    articleDetails: () => [...queryKeys.articles.all, 'detail'] as const,
    detail: (id: number | string) => [...queryKeys.articles.articleList(), ...queryKeys.articles.articleDetails(), id] as const,
    articleRandom: (id: string) => [...queryKeys.articles.all, 'random', id] as const,
    articleLike: (id: number | string) => [...queryKeys.articles.detail(id), 'like'] as const,
    commentList: (id: number | string) => [...queryKeys.articles.detail(id), 'comments'] as const,
    comment: (id: number | string) => [...queryKeys.articles.commentList(id), 'comment'] as const,
    commentEdit: (id: number | string) => [...queryKeys.articles.commentList(id), 'edit'] as const,
    commentDelete: (id: number | string) => [...queryKeys.articles.commentList(id), 'delete'] as const,
    commentLike: (id: number | string) => [...queryKeys.articles.comment(id), 'like'] as const,
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
} as const

export type QueryKeys = typeof queryKeys
