
export default {
  Base: '/api',
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
    Login: '/login',
  },
  Articles: {
    Base: '/articles',
    Get: '/all',
    Add: '/add',
    GetByUserId: '/user/:userId',
    GetById: '/:id',
  },
  Uploads: {
    Base: '/upload',
    File: '/file',
  },
} as const;
