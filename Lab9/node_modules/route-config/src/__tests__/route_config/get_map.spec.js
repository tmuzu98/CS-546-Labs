describe('RouteConfig.getMap', () => {
  const map = require('./fixture').default

  it('should returns map', () => {
    expect(map.getMap()).toEqual({
      namespaces: {
        users: {
          config: {},
          fullPath: '/users',
          id: 'users',
          key: 'users',
          namespaces: {
            show: {
              config: { exact: false },
              fullPath: '/users/:userId',
              id: 'users.show',
              key: 'show',
              namespaces: {},
              path: '/:userId',
              routes: {
                index: {
                  config: { exact: false },
                  fullPath: '/users/:userId',
                  id: 'users.show',
                  key: 'index'
                },
                settings: {
                  config: { exact: false },
                  fullPath: '/users/:userId/settings',
                  id: 'users.show.settings',
                  key: 'settings',
                  path: '/settings'
                }
              }
            }
          },
          path: '/users',
          routes: {
            index: { config: { exact: true }, fullPath: '/users', id: 'users', key: 'index' }
          }
        }
      },
      routes: {
        home: { config: { exact: true }, fullPath: '/', id: 'home', key: 'home', path: '/' }
      }
    })
  })

  it('should filter route settings and returns map', () => {
    expect(map.getMap({ filter: item => item.key !== 'settings' })).toEqual({
      namespaces: {
        users: {
          config: {},
          fullPath: '/users',
          id: 'users',
          key: 'users',
          namespaces: {
            show: {
              config: { exact: false },
              fullPath: '/users/:userId',
              id: 'users.show',
              key: 'show',
              namespaces: {},
              path: '/:userId',
              routes: {
                index: {
                  config: { exact: false },
                  fullPath: '/users/:userId',
                  id: 'users.show',
                  key: 'index'
                }
              }
            }
          },
          path: '/users',
          routes: {
            index: { config: { exact: true }, fullPath: '/users', id: 'users', key: 'index' }
          }
        }
      },
      routes: {
        home: { config: { exact: true }, fullPath: '/', id: 'home', key: 'home', path: '/' }
      }
    })
  })

  it('should filter namespace users and returns map', () => {
    expect(map.getMap({ filter: (item) => item.path !== '/users' })).toEqual({
      namespaces: {},
      routes: {
        home: { config: { exact: true }, fullPath: '/', id: 'home', key: 'home', path: '/' }
      }
    })
  })

  it('should filter namespace users, format route home and returns map', () => {
    expect(map.getMap({
      filter: item => item.path !== '/users',
      formatRoute: ({ key, path }) => ({ key, path })
    })).toEqual({
      namespaces: {},
      routes: { home: { key: 'home', path: '/' } }
    })
  })
})
