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
    commentList: (articleId: number | string, page: number = 1) => ['articles', articleId, 'comments', 'list', page],
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
    all: ['products'] as const,
    list: (filters: Record<string, any> = {}) => [...QUERY_KEYS.products.all, 'list', filters] as const,
    detail: (id: number | string) => [...QUERY_KEYS.products.all, 'detail', id] as const,
    related: (id: number | string) => [...QUERY_KEYS.products.detail(id), 'related'] as const,
    random: () => [...QUERY_KEYS.products.all, 'random'] as const,
    search: (query: string) => [...QUERY_KEYS.products.all, 'search', query] as const,
    discounted: () => [...QUERY_KEYS.products.all, 'discounted'] as const,
    featured: () => [...QUERY_KEYS.products.all, 'featured'] as const,
    // Данные для фильтров
    breweries: () => [...QUERY_KEYS.products.all, 'breweries'] as const,
    categories: () => [...QUERY_KEYS.products.all, 'categories'] as const,
    commentList: (productId: number | string, page: number = 1) => ['products', productId, 'comments', 'list', page],
    commentListAll: (productId: number | string) => ['products', productId, 'comments'] as const,
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
    address: (id: string) => [...QUERY_KEYS.user.addresses(), id] as const,
    billingAddresses: () => [...QUERY_KEYS.user.all, 'billing-addresses'] as const,
    shippingAddresses: () => [...QUERY_KEYS.user.all, 'shipping-addresses'] as const,
    avatar: () => [...QUERY_KEYS.user.all, 'avatar'] as const,
    favorites: () => [...QUERY_KEYS.user.all, 'favorites'] as const,
    ratings: () => [...QUERY_KEYS.user.all, 'ratings'] as const,
  },
  cart: {
    all: ['cart'] as const,
    details: () => [...QUERY_KEYS.cart.all, 'details'] as const,
    items: () => [...QUERY_KEYS.cart.all, 'items'] as const,
    item: (id: string) => [...QUERY_KEYS.cart.items(), id] as const,
    summary: () => [...QUERY_KEYS.cart.all, 'summary'] as const,
    promo: () => [...QUERY_KEYS.cart.all, 'promo'] as const,
    payment: () => [...QUERY_KEYS.cart.all, 'payment'] as const,
  },
} as const;

export type QueryKeys = typeof QUERY_KEYS;
