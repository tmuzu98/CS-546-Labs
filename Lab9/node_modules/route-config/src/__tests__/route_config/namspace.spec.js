import RouteConfig from '../../route_config'

describe('namespace', () => {
  it('should add namespace on empty map', () => {
    const map = new RouteConfig()
    map.namespace({ key: 'comments', path: '/comments' })
    expect(map.keys.namespaces.length).toBe(1)
    expect(map.keys.namespaces.includes('comments')).toBe(true)

    const { key, path } = map.namespaces['comments']
    expect({ key, path }).toEqual({
      key: 'comments',
      path: '/comments'
    })
  })

  it('should add namespace on an existing map', () => {
    const map = require('./fixture').default
    map.namespace({ key: 'comments', path: '/comments' })
    expect(map.keys.namespaces.length).toBe(2)
    expect(map.keys.namespaces.includes('users')).toBe(true)
    expect(map.keys.namespaces.includes('comments')).toBe(true)

    const { key, path } = map.namespaces['comments']
    expect({ key, path }).toEqual({
      key: 'comments',
      path: '/comments'
    })
  })

  it('should override existing namespace but not insert same key twice', () => {
    const map = new RouteConfig()
    let namespace = map.namespace({ key: 'comments', path: '/home' })
    expect(map.keys.namespaces.length).toBe(1)
    expect(map.keys.namespaces.includes('comments')).toBe(true)
    expect(namespace.key).toBe('comments')
    expect(namespace.path).toBe('/home')

    namespace = map.namespace({ key: 'comments', path: '/comments' })
    expect(map.keys.namespaces.length).toBe(1)
    expect(map.keys.namespaces.includes('comments')).toBe(true)
    expect(namespace.key).toBe('comments')
    expect(namespace.path).toBe('/comments')
  })

  it('should return namespace map', () => {
    const map = new RouteConfig()
    let namespace = map.namespace({ key: 'comments', path: '/comments' })
    namespace.route({ key: 'show', path: '/:commentId' })
    expect(namespace.getMap()).toEqual({
      config: {},
      fullPath: '/comments',
      id: 'comments',
      key: 'comments',
      namespaces: {},
      path: '/comments',
      routes: {
        show: {
          config: {},
          fullPath: '/comments/:commentId',
          id: 'comments.show',
          key: 'show',
          path: '/:commentId'
        }
      }
    })
  })
})
