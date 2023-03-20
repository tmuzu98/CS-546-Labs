import RouteConfig from '../../route_config'

describe('route', () => {
  it('should add route on empty map', () => {
    const map = new RouteConfig()
    map.route({ key: 'contact', path: '/contact' })
    expect(map.keys.routes.length).toBe(1)
    expect(map.keys.routes.includes('contact')).toBe(true)

    const route = map.routes['contact']
    expect(route).toEqual({
      config: {},
      fullPath: '/contact',
      id: 'contact',
      key: 'contact',
      path: '/contact'
    })
  })

  it('should add route on an existing map', () => {
    const map = require('./fixture').default
    map.route({ key: 'contact', path: '/contact' })
    expect(map.keys.routes.length).toBe(2)
    expect(map.keys.routes.includes('home')).toBe(true)
    expect(map.keys.routes.includes('contact')).toBe(true)

    const route = map.routes['contact']
    expect(route).toEqual({
      config: {},
      fullPath: '/contact',
      id: 'contact',
      key: 'contact',
      path: '/contact'
    })
  })

  it('should override existing route but not insert same key twice', () => {
    const map = new RouteConfig()
    map.route({ config: { exact: true }, key: 'contact', path: '/home' })
    let route = map.routes['contact']
    expect(map.keys.routes.length).toBe(1)
    expect(map.keys.routes.includes('contact')).toBe(true)
    expect(route.key).toBe('contact')
    expect(route.path).toBe('/home')

    map.route({ config: { exact: false }, key: 'contact', path: '/contact' })
    route = map.routes['contact']
    expect(map.keys.routes.length).toBe(1)
    expect(map.keys.routes.includes('contact')).toBe(true)
    expect(route.key).toBe('contact')
    expect(route.path).toBe('/contact')
  })
})
