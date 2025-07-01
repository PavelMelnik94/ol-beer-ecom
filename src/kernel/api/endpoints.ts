export const API_ENDPOINTS = {
  articles: {
    all: '/blog/posts',
    details: (postId: string) => `/blog/posts/${postId}`,
    like: (postId: string) => `/blog/posts/${postId}/like`,
    comments: (postId: string) => `/blog/posts/${postId}/comments`,
    comment: (postId: string) => `/blog/posts/${postId}/comments`,
    tags: 'blog/tags',
    random: (excludePostId: string) => `/blog/posts/random?excludePostId=${excludePostId}`,

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
} as const
