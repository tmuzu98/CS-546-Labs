import RouteMap from '../../route_config'

export default new RouteMap({
  namespaces: {
    users: {
      namespaces: {
        show: {
          config: { exact: false },
          path: '/:userId',
          routes: {
            index: {},
            settings: { path: '/settings' }
          }
        }
      },
      path: '/users',
      routes: { index: { config: { exact: true } } }
    }
  },
  routes: { home: { config: { exact: true }, path: '/' } }
})
