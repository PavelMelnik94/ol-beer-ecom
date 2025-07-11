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
    // Addresses
    addresses: '/api/users/addresses',
    address: (id: string) => `/api/users/addresses/${id}`,
    setAddressPrimary: (id: string) => `/api/users/addresses/${id}/set-primary`,

    // Avatar
    avatar: '/api/users/avatar',

    // Billing and shipping addresses
    billingAddresses: '/api/users/billing-addresses',
    shippingAddresses: '/api/users/shipping-addresses',

    // Favorites
    favorites: '/api/users/favorites',

    // Ratings
    ratings: '/api/users/ratings',
  },
} as const;
