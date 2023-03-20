describe('RouteConfig.getNormalizedMap', () => {
  const map = require('./fixture').default

  it('should return normalized map', () => {
    expect(map.getNormalizedMap()).toEqual({
      entities: {
        namespaces: {
          users: {
            config: {},
            fullPath: '/users',
            id: 'users',
            key: 'users',
            namespaces: ['users.show'],
            path: '/users',
            routes: ['users']
          },
          'users.show': {
            config: { exact: false },
            fullPath: '/users/:userId',
            id: 'users.show',
            key: 'show',
            namespaces: [],
            path: '/:userId',
            routes: ['users.show', 'users.show.settings']
          }
        },
        routes: {
          home: {
            config: { exact: true },
            fullPath: '/',
            id: 'home',
            key: 'home',
            path: '/'
          },
          'users': {
            config: { exact: true },
            fullPath: '/users',
            id: 'users',
            key: 'index'
          },
          'users.show': {
            config: { exact: false },
            fullPath: '/users/:userId',
            id: 'users.show',
            key: 'index'
          },
          'users.show.settings': {
            config: { exact: false },
            fullPath: '/users/:userId/settings',
            id: 'users.show.settings',
            key: 'settings',
            path: '/settings'
          }
        }
      },
      result: {
        namespaces: ['users'],
        routes: ['home']
      }
    })
  })

  it('should return filtered normalized map', () => {
    expect(map.getNormalizedMap({ filter: item => item.path !== '/:userId' })).toEqual({
      entities: {
        namespaces: {
          users: {
            config: {},
            fullPath: '/users',
            id: 'users',
            key: 'users',
            namespaces: [],
            path: '/users',
            routes: ['users']
          }
        },
        routes: {
          home: {
            config: { exact: true },
            fullPath: '/',
            id: 'home',
            key: 'home',
            path: '/'
          },
          'users': {
            config: { exact: true },
            fullPath: '/users',
            id: 'users',
            key: 'index'
          }
        }
      },
      result: {
        namespaces: ['users'],
        routes: ['home']
      }
    })
  })

  it('should format routes and return normalized map', () => {
    expect(map.getNormalizedMap({
      formatRoute: ({ id, key, path }) => ({ id, key, path })
    })).toEqual({
      entities: {
        namespaces: {
          users: {
            config: {},
            fullPath: '/users',
            id: 'users',
            key: 'users',
            namespaces: ['users.show'],
            path: '/users',
            routes: ['users']
          },
          'users.show': {
            config: { exact: false },
            fullPath: '/users/:userId',
            id: 'users.show',
            key: 'show',
            namespaces: [],
            path: '/:userId',
            routes: ['users.show', 'users.show.settings']
          }
        },
        routes: {
          home: {
            id: 'home',
            key: 'home',
            path: '/'
          },
          'users': {
            id: 'users',
            key: 'index',
            path: undefined
          },
          'users.show': {
            id: 'users.show',
            key: 'index',
            path: undefined
          },
          'users.show.settings': {
            id: 'users.show.settings',
            key: 'settings',
            path: '/settings'
          }
        }
      },
      result: {
        namespaces: ['users'],
        routes: ['home']
      }
    })
  })
})
