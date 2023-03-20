import RouteConfig from '../../route_config'

describe('RouteConfig.fromNormalizedMap', () => {
  it('should set map from normalized map', () => {
    const fromNormalizedMap = RouteConfig.fromNormalizedMap({
      entities: {
        namespaces: {
          articles: {
            id: 'articles',
            key: 'articles',
            namespaces: ['articles.show'],
            path: '/articles',
            routes: []
          },
          'articles.show': {
            id: 'articles.show',
            key: 'show',
            namespaces: [],
            path: '/:articleId',
            routes: ['articles.show']
          }
        },
        routes: {
          contact: { id: 'contact', key: 'contact', path: '/contact' },
          'articles.show': { id: 'articles.show', key: 'index' }
        }
      },
      result: {
        namespaces: ['articles'],
        routes: ['contact']
      }
    })
    expect(fromNormalizedMap.getMap()).toEqual({
      namespaces: {
        articles: {
          config: {},
          fullPath: '/articles',
          id: 'articles',
          key: 'articles',
          namespaces: {
            show: {
              config: {},
              fullPath: '/articles/:articleId',
              id: 'articles.show',
              key: 'show',
              namespaces: {},
              path: '/:articleId',
              routes: {
                index: {
                  config: {},
                  fullPath: '/articles/:articleId',
                  id: 'articles.show',
                  key: 'index'
                }
              }
            }
          },
          path: '/articles',
          routes: {}
        }
      },
      routes: {
        contact: {
          config: {},
          fullPath: '/contact',
          id: 'contact',
          key: 'contact',
          path: '/contact'
        }
      }
    })
  })
})
