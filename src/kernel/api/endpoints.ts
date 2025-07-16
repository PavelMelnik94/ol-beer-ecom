export const API_ENDPOINTS = {
  articles: {
    all: '/blog/posts',

    articleDetails: (postId: string) => `/blog/posts/${postId}`,
    articleLike: (postId: string) => `/blog/posts/${postId}/like`,
    randomArticle: (excludePostId: string) => `/blog/posts/random?excludePostId=${excludePostId}`,

    comments: (postId: string) => `/blog/posts/${postId}/comments`,
    commentLike: (commentId: string) => `/blog/comments/${commentId}/like`,
    commentCreate: (postId: string) => `/blog/posts/${postId}/comments`,
    commentEdit: (commentId: string) => `/blog/comments/${commentId}`,
    commentDelete: (commentId: string) => `/blog/comments/${commentId}`,

    tags: 'blog/tags',

  },
  breweries: {
    all: '/breweries',
    details: (breweryId: string) => `/breweries/${breweryId}`,
    products: (breweryId: string) => `/breweries/${breweryId}/products`,
  },

  auth: {
    login: 'auth/login',
    register: 'auth/register',
  },

  products: {
    all: '/products',
    detail: (id: string) => `/products/${id}`,
    create: '/products',
    update: (id: string) => `/products/${id}`,
    delete: (id: string) => `/products/${id}`,
    related: (id: string, limit?: number) => `/products/${id}/related${limit ? `?limit=${limit}` : ''}`,
    breweries: '/products/breweries',
    byBrewery: (breweryId: string) => `/products/by-brewery/${breweryId}`,
    byPriceRange: '/products/by-price-range',
    categories: '/products/categories',
    discounted: '/products/discounted',
    featured: '/products/featured',
    rate: '/products/rate',
    search: '/products/search',
    stats: '/products/stats',

    comments: (postId: string) => `/products/${postId}/comments`,
    commentCreate: (postId: string) => `/products/${postId}/comments`,

    commentEdit: (commentId: string) => `/products/comments/${commentId}`,
    commentLike: (commentId: string) => `/products/comments/${commentId}/like`,
    commentDelete: (commentId: string) => `/products/comments/${commentId}`,
  },

  users: {
    addresses: '/users/addresses',
    address: (id: string) => `/users/addresses/${id}`,
    setAddressPrimary: (id: string) => `/users/addresses/${id}/set-primary`,
    avatar: '/users/avatar',
    billingAddresses: '/users/billing-addresses',
    shippingAddresses: '/users/shipping-addresses',
    favorites: '/users/favorites',
    ratings: '/users/ratings',
    profile: '/users/profile',
    changePassword: '/users/change-password',
  },

  cart: {
    cart: '/cart',
    items: '/cart/items',
    itemsBatch: '/cart/items/batch',
    item: (id: string) => `/cart/items/${id}`,
    summary: '/cart/summary',
    promo: '/cart/promo',
    payment: '/cart/payment',

  }
} as const;
