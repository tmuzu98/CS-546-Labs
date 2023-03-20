export default class ConfigManager {
  constructor (configs = []) {
    this.configs = []
    configs.forEach((config) => { this.add(config) })
  }

  add (config) {
    if (!config || !config.isConfig() || !config.name()) {
      throw new TypeError('ConfigManager(add): `config` must be a Config instance.')
    }
    if (this.configs.find(c => c.name() === config.name())) {
      throw new Error(`ConfigManager(add): config '${config.name()}' already exists`)
    }
    this.configs.push(config)
  }

  merge (...values) {
    const initialValue = values.reduce(
      (acc, value) => value && typeof value === 'object' ? { ...acc, ...value } : acc,
      {}
    )
    return this.configs.reduce((acc, config) => {
      const name = config.name()
      acc[name] = config.merge(...values.map((value = {}) => value[name]))
      return acc
    }, initialValue)
  }

  set (value = {}) {
    const initialValue = value && typeof value === 'object' ? { ...value } : {}
    return this.configs.reduce((acc, config) => {
      const name = config.name()
      acc[name] = config.set(value[name])
      return acc
    }, initialValue)
  }
}
