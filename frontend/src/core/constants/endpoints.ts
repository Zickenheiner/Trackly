const endpoints = {
  auth: {
    refresh: '/auth/refresh',
    register: '/auth/register',
    login: '/auth/login',
  },
  categories: '/categories',
  categoryById: (id: string) => `/categories/${id}`,
};

export default endpoints;
