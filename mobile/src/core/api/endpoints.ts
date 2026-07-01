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
};

export default endpoints;
