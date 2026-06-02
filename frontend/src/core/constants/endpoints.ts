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
  transactions: '/transactions',
};

export default endpoints;
