// Query key factories для типобезопасности и переиспользования
export const queryKeys = {
  // Beer queries
  beers: {
    all: ['beers'] as const,
    lists: () => [...queryKeys.beers.all, 'list'] as const,
    list: (filters: Record<string, any>) => [...queryKeys.beers.lists(), filters] as const,
    details: () => [...queryKeys.beers.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.beers.details(), id] as const,
    random: () => [...queryKeys.beers.all, 'random'] as const,
  },

  // Auth queries (future)
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    profile: () => [...queryKeys.auth.user(), 'profile'] as const,
  },

  // User queries (future)
  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
    addresses: () => [...queryKeys.user.all, 'addresses'] as const,
  },
} as const

export type QueryKeys = typeof queryKeys
