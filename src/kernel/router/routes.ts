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
    login: {
      full: '/auth/login',
      short: 'login',
    },
    register: {
      full: '/auth/register',
      short: 'register',
    },
  },
  showcase: {
    root: '/showcase',
    item: (id: string) => `/showcase/${id}`,
  },
  profile: {
    root: '/profile',
    orders: {
      full: '/profile/orders',
      short: 'orders',
    },
    favorites: {
      full: '/profile/favorites',
      short: 'favorites',
    },
  },
  about: {
    root: '/about',
  },
  basket: {
    root: '/basket',
  },
} as const;
