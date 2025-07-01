export const ROUTES = {
  home: {
    root: '/',
  },
  articles: {
    root: '/articles',
    article: (id: string) => `/articles/${id}?commentPage=1`,
  },
  breweries: {
    root: '/breweries',
    brewery: (id: string) => `/breweries/${id}`,
  },
  auth: {
    root: '/auth',
    login: '/auth/login',
    register: '/auth/register',
  },
  store: {
    root: '/store',
  },
  profile: {
    root: '/profile',
    orders: '/profile/orders',
  },
  about: {
    root: '/about',
  },
  basket: {
    root: '/basket',
  },
} as const;
