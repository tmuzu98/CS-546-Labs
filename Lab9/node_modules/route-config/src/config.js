export default class Config {
  constructor (name) {
    if (typeof name !== 'string') {
      throw new TypeError('Config: name must be a string')
    }
    this._name = name
  }

  isConfig () { return true }
  merge (...values) { return Object.assign({}, ...values) }
  name () { return this._name }
  set (value) { return Object.assign({}, value) }
}
