const endpoints = {
  auth: {
    refresh: '/auth/refresh',
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
  },
  users: {
    me: '/users/me',
  },
  categories: '/categories',
  categoryById: (id: string) => `/categories/${id}`,
  goals: {
    base: '/goals',
    byId: (id: string) => `/goals/${id}`,
    deposits: (id: string) => `/goals/${id}/deposits`,
  },
  dashboard: {
    summary: '/dashboard/summary',
  },
  statistics: {
    byCategory: '/statistics/by-category',
  },
};

export default endpoints;
