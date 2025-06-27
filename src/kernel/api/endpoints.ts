export const API_ENDPOINTS = {
  articles: {
    all: '/blog/posts',
    details: (postId: string) => `/blog/posts/${postId}`,
    like: (postId: string) => `/blog/posts/${postId}/like`,
    comments: (postId: string) => `/blog/posts/${postId}/comments`,
  },
} as const
