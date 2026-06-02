const endpoints = {
  auth: {
    refresh: '/auth/refresh',
  },
  categories: '/categories',
  categoryById: (id: string) => `/categories/${id}`,
};

export default endpoints;
