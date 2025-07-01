export const API_ENDPOINTS = {
  articles: {
    all: '/blog/posts',
    details: (postId: string) => `/blog/posts/${postId}`,
    likeArticle: (postId: string) => `/blog/posts/${postId}/like`,
    likeComment: (commentId: string) => `/blog/comments/${commentId}/like`,
    comments: (postId: string) => `/blog/posts/${postId}/comments`,
    commentCreate: (postId: string) => `/blog/posts/${postId}/comments`,
    commentEdit: (commentId: string) => `/blog/comments/${commentId}`,
    commentDelete: (commentId: string) => `/blog/comments/${commentId}`,
    tags: 'blog/tags',
    randomArticle: (excludePostId: string) => `/blog/posts/random?excludePostId=${excludePostId}`,

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
