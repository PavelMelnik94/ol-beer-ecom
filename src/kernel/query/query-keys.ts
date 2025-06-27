export const queryKeys = {

  articles: {
    all: ['articles'] as const,
    lists: () => [...queryKeys.articles.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.articles.lists(), filters] as const,
    details: () => [...queryKeys.articles.all, 'detail'] as const,
    detail: (id: number | string) => [...queryKeys.articles.details(), id] as const,
    random: () => [...queryKeys.articles.all, 'random'] as const,
    like: (id: number | string) => [...queryKeys.articles.detail(id), 'like'] as const,
    comments: (id: number | string) => [...queryKeys.articles.detail(id), 'comments'] as const,
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
    user: () => [...queryKeys.auth.all, 'user'] as const,
    profile: () => [...queryKeys.auth.user(), 'profile'] as const,
  },

  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
    addresses: () => [...queryKeys.user.all, 'addresses'] as const,
  },
} as const

export type QueryKeys = typeof queryKeys
