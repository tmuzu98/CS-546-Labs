import Config from '../../config'
import RouteConfig from '../../route_config'

describe('new RouteConfig()', () => {
  it('should create empty map', () => {
    const map = new RouteConfig()
    expect(map.getMap()).toEqual(null)
  })

  it('should create new setted map', () => {
    const map = new RouteConfig({
      namespaces: { users: { path: '/users', routes: { index: {} } } },
      routes: { home: { config: { exact: true }, path: '/' } }
    })
    expect(map.getMap()).toEqual({
      namespaces: {
        users: {
          config: {},
          fullPath: '/users',
          id: 'users',
          key: 'users',
          namespaces: {},
          path: '/users',
          routes: { index: { config: {}, fullPath: '/users', id: 'users', key: 'index' } }
        }
      },
      routes: {
        home: { config: { exact: true }, fullPath: '/', id: 'home', key: 'home', path: '/' }
      }
    })
  })

  it('should create new setted map with custom configs', () => {
    class CustomConfig extends Config {
      set () { return { hello: 'world' } }

      merge () { return { hello: 'world' } }
    }
    const config = new CustomConfig('helloWorld')
    const map = new RouteConfig({ routes: { home: { path: '/' } } }, { configs: [config] })
    expect(map.getMap()).toEqual({
      namespaces: {},
      routes: {
        home: {
          config: { helloWorld: { hello: 'world' } },
          fullPath: '/',
          id: 'home',
          key: 'home',
          path: '/'
        }
      }
    })
  })
})
