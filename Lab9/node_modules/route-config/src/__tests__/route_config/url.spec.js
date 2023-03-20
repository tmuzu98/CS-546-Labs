describe('RouteConfig.url', () => {
  const map = require('./fixture').default

  it('should return not compiled url', () => {
    expect(map.url('users.show')).toBe('/users/:userId')
  })

  it('should return compiled url', () => {
    expect(map.url('users.show', { userId: '123' })).toBe('/users/123')
  })

  it('should return null', () => {
    expect(map.url('notFound')).toBe(null)
  })
})
