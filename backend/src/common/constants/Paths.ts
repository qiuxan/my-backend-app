
export default {
  Base: '/api',
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Articles: {
    Base: '/articles',
    Get: '/all',
    Add: '/add',
    GetByUserId: '/user/:userId',
    GetById: '/:id',
  },
} as const;
