export const ROUTES = {
  home: {
    root: '/',
  },
  articles: {
    article: (id: string) => `/articles/${id}`,
  },
} as const;
