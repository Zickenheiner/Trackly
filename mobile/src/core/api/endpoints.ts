const endpoints = {
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  },
  users: {
    me: '/users/me',
  },
  dashboard: {
    summary: '/dashboard/summary',
  },
  statistics: {
    byCategory: '/statistics/by-category',
    monthly: '/statistics/monthly',
  },
  categories: {
    list: '/categories',
    byId: (id: string) => `/categories/${id}`,
  },
  transactions: {
    base: '/transactions',
    byId: (id: string) => `/transactions/${id}`,
  },
  goals: {
    base: '/goals',
    byId: (id: string) => `/goals/${id}`,
    deposits: (id: string) => `/goals/${id}/deposits`,
  },
};

export default endpoints;
