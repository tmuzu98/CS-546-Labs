describe('RouteConfig.getRoute', () => {
  const map = require('./fixture').default

  it('should find direct route', () => {
    expect(map.getRoute('home')).toEqual({
      config: { exact: true },
      fullPath: '/',
      id: 'home',
      key: 'home',
      path: '/'
    })
  })

  it('should get nested route', () => {
    expect(map.getRoute('users.show')).toEqual({
      config: { exact: false },
      fullPath: '/users/:userId',
      id: 'users.show',
      key: 'index'
    })
  })
})
