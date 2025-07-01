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
} as const
