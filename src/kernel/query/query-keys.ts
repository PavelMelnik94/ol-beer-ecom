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
    commentList: (articleId: number | string, page: number = 1) => ['articles', articleId, 'comments', 'list', page] as const,
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

  products: {
    all: ['products'] as const, // все продукты (базовый ключ)
    list: (filters: Record<string, any> = {}) => [...QUERY_KEYS.products.all, 'list', filters] as const, // GET /api/products c фильтрами/пагинацией
    listBase: () => [...QUERY_KEYS.products.all, 'list'] as const,
    detail: (id: number | string) => [...QUERY_KEYS.products.all, 'detail', id] as const, // GET /api/products/{id}
    create: () => [...QUERY_KEYS.products.all, 'create'] as const, // POST /api/products
    update: (id: number | string) => [...QUERY_KEYS.products.detail(id), 'update'] as const, // PATCH /api/products/{id}
    delete: (id: number | string) => [...QUERY_KEYS.products.detail(id), 'delete'] as const, // DELETE /api/products/{id}
    related: (id: number | string) => [...QUERY_KEYS.products.detail(id), 'related'] as const, // GET /api/products/{id}/related
    breweries: () => [...QUERY_KEYS.products.all, 'breweries'] as const, // GET /api/products/breweries
    byBrewery: (breweryId: number | string) => [...QUERY_KEYS.products.all, 'by-brewery', breweryId] as const, // GET /api/products/by-brewery/{breweryId}
    byPriceRange: (range: { min: number; max: number; }) =>
      [...QUERY_KEYS.products.all, 'by-price-range', range] as const, // GET /api/products/by-price-range
    categories: () => [...QUERY_KEYS.products.all, 'categories'] as const, // GET /api/products/categories
    discounted: () => [...QUERY_KEYS.products.all, 'discounted'] as const, // GET /api/products/discounted
    featured: () => [...QUERY_KEYS.products.all, 'featured'] as const, // GET /api/products/featured
    rate: (id: number | string) => [...QUERY_KEYS.products.detail(id), 'rate'] as const, // POST /api/products/rate
    search: (query: string) => [...QUERY_KEYS.products.all, 'search', query] as const, // GET /api/products/search
    stats: () => [...QUERY_KEYS.products.all, 'stats'] as const, // GET /api/products/stats
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
