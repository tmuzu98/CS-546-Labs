import prefixer from '../prefix'

describe('utils/prefix', () => {
  const base = 'base'
  const prefix = 'prefix'

  it('should return only base', () => {
    expect(prefixer(base)).toBe('base')
  })

  it('should return only prefix', () => {
    expect(prefixer('', prefix)).toBe('prefix')
  })

  it('should add separator', () => {
    expect(prefixer(base, prefix, '.')).toBe('prefix.base')
  })

  it('should not add separator', () => {
    expect(prefixer(base, '', '.')).toBe('base')
    expect(prefixer('', prefix, '.')).toBe('prefix')
  })
})
