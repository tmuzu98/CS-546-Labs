import pathToRegexp from 'path-to-regexp'
import { denormalize, normalize, schema } from 'normalizr'

import ConfigManager from './config_manager'
import prefix from './utils/prefix'

const identity = i => i

/**
 * @class RouteConfig
 * @export
 */
export default class RouteConfig {
  /**
   * @summary Creates an instance of RouteDescriptor.
   * @locus Anywhere
   * @memberof RouteConfig
   * @param {Object} [map={ namespaces:{}, routes: {} }]
   * @param {Object} [options={}]
   * @param {ConfigManager} [options.configs]
   */
  constructor (map, options = {}) {
    this.configManager = new ConfigManager(options.configs)
    this.keys = { namespaces: [], routes: [] }
    this.namespaces = {}
    this.options = options
    this.routes = {}

    this._initMap(map || { namespaces: {}, routes: {} })
  }

  _cloneAttributes (source = this) {
    if (!source) return source

    const attributes = ['fullPath', 'id', 'key', 'path']
    const clone = {}

    if (source.config) {
      clone.config = this.configManager.set(source.config)
    }
    return attributes.reduce((acc, attributeName) => {
      if (source[attributeName]) {
        acc[attributeName] = source[attributeName]
      }
      return acc
    }, clone)
  }

  /**
   * @summary Returns `key` route
   * @locus Anywhere
   * @memberof RouteConfig
   * @method _findRoute
   * @param {Array<String>|String} key
   * @private
   * @return {Object}
   */
  _findRoute (key) {
    const keys = Array.isArray(key) ? key : key.split('.')
    let route

    if (keys.length === 1) {
      route = this.routes[key] || (this.namespaces[key] && this.namespaces[key]._findRoute('index'))
    } else if (keys.length > 1) {
      route = this.namespaces[keys[0]] && this.namespaces[keys[0]]._findRoute(keys.slice(1))
    }
    if (!route && process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line
      console.warn(`RouteConfig: Route(${key}) not found`)
    }
    return route
  }

  /**
   * @summary Returns map can be normalized
   * @locus Anywhere
   * @instance
   * @memberof RouteConfig
   * @method _getNormalizableMap
   * @param {Object} [options={}]
   * @param {Function} [options.filter]
   * @param {Function} [options.formatRoute=identity]
   * @private
   * @return {Object}
   */
  _getNormalizableMap (options = {}) {
    const { filter, formatRoute = identity } = options
    const map = this._cloneAttributes()
    map.namespaces = []
    map.routes = []

    this.keys.namespaces.forEach((nKey) => {
      if (filter && !filter(this.namespaces[nKey])) return

      const namespace = this.namespaces[nKey]._getNormalizableMap(options)
      if (namespace) {
        map.namespaces.push(namespace)
      }
    })
    this.keys.routes.forEach((rKey) => {
      if (filter && !filter(this.routes[rKey])) return
      map.routes.push(formatRoute(this._cloneAttributes(this.routes[rKey])))
    })
    return map.namespaces.length > 0 || map.routes.length > 0 ? map : null
  }

  /**
   * @summary Init map from `map`
   * @locus Anywhere
   * @instance
   * @memberof RouteConfig
   * @method _initMap
   * @param {Object} map
   * @private
   */
  _initMap (map) {
    if (!map) {
      throw new Error('RouteConfig: `map` is required.')
    }

    const { namespaces = {}, routes = {} } = map
    const values = this._cloneAttributes(map)
    Object.keys(values).forEach((value) => {
      if (values[value]) {
        this[value] = values[value]
      }
    })
    Object.keys(namespaces).forEach((key) => { this.namespace({ key, ...namespaces[key] }) })
    Object.keys(routes).forEach((key) => { this.route({ key, ...routes[key] }) })
  }

  /**
   * @summary Returns map namespaces and routes
   * @locus Anywhere
   * @instance
   * @memberof RouteConfig
   * @method getMap
   * @param {Object} [options={}]
   * @param {Function} [options.filter]
   * @param {Function} [options.formatRoute=identity]
   * @return {Object}
   * @throws {TypeError}
   */
  getMap (options = {}) {
    const { filter, formatRoute = identity } = options
    let namespaceSize = 0
    let routeSize = 0
    const map = {
      ...this._cloneAttributes(),
      namespaces: this.keys.namespaces.reduce((acc, nKey) => {
        if (filter && !filter(this.namespaces[nKey])) return acc

        const namespace = this.namespaces[nKey].getMap(options)
        if (namespace) {
          acc[nKey] = namespace
          namespaceSize += 1
        }
        return acc
      }, {}),
      routes: this.keys.routes.reduce((acc, rKey) => {
        if (!filter || filter(this.routes[rKey])) {
          acc[rKey] = formatRoute(this._cloneAttributes(this.routes[rKey]))
          routeSize += 1
        }
        return acc
      }, {})
    }
    return namespaceSize > 0 || routeSize > 0 ? map : null
  }

  /**
   * @summary Returns normalized map
   * @locus Anywhere
   * @instance
   * @memberof RouteConfig
   * @method getNormalizedMap
   * @param {Object} [options={}]
   * @param {Function} [options.filter]
   * @param {Function} [options.formatRoute=identity]
   * @return {Object}
   * @throws {AssertionError}
   */
  getNormalizedMap (options = {}) {
    const map = this._getNormalizableMap(options)
    if (!map) return null

    const routeSchema = new schema.Entity('routes')
    const namespaceSchema = new schema.Entity('namespaces', { routes: [routeSchema] })
    namespaceSchema.define({ namespaces: [namespaceSchema] })
    return normalize(map, { namespaces: [namespaceSchema], routes: [routeSchema] })
  }

  /**
   * @summary Returns route by `key`
   * @locus Anywhere
   * @instance
   * @memberof RouteConfig
   * @method getRoute
   * @param {String} key
   * @return {Object}
   * @throws {TypeError}
   */
  getRoute (key) {
    if (typeof key !== 'string' || key === '') {
      throw new TypeError('RouteConfig(getRoute): `key` must be a non empty string.')
    }
    return this._cloneAttributes(this._findRoute(key))
  }

  /**
   * @summary Merges maps
   * @locus Anywhere
   * @instance
   * @memberof RouteConfig
   * @method  merge
   * @param {...Object} maps
   */
  merge (...maps) {
    maps.forEach(({ config, namespaces = {}, routes = {}, ...other }) => {
      const values = this._cloneAttributes({
        config: config || this.config
          ? this.configManager.merge(this.config || {}, config || {})
          : undefined,
        ...other
      })
      Object.keys(values).forEach((value) => {
        if (values[value]) {
          this[value] = values[value]
        }
      })
      Object.keys(namespaces).forEach((name) => {
        const namespace = this.namespaces[name]
        if (namespace) {
          namespace.merge(namespaces[name])
        } else {
          this.namespace({ ...namespaces[name], key: name })
        }
      })
      Object.keys(routes).forEach((name) => {
        const route = this.routes[name] || {}
        this.route(this._cloneAttributes({
          ...routes[name],
          key: name,
          config: this.configManager.merge(route.config || {}, routes[name].config || {})
        }))
      })
    })
  }

  /**
   * @summary Adds namespace and it's nested namespaces / routes
   * @locus Anywhere
   * @instance
   * @memberof RouteConfig
   * @method namespace
   * @param {String} namespace
   * @param {Object} [namespace.config]
   * @param {String} [namespace.fullPath]
   * @param {String} [namespace.id]
   * @param {String} namespace.key
   * @param {Object} [namespace.namespaces={}]
   * @param {String} namespace.path
   * @param {Object} [namespace.routes={}]
   * @return {RouteConfig}
   * @throws {TypeError}
   */
  namespace ({ config, fullPath, id, key, namespaces = {}, path, routes = {} }) {
    if (fullPath && typeof fullPath !== 'string') {
      throw new TypeError('RouteConfig(namespace): `fullPath` must be a non empty string.')
    }
    if (id && typeof id !== 'string') {
      throw new TypeError('RouteConfig(namespace): `id` must be a non empty string.')
    }
    if (typeof key !== 'string' || key === '') {
      throw new TypeError('RouteConfig(namespace): `key` must be a non empty string.')
    }
    if (typeof path !== 'string' || path === '') {
      throw new TypeError('RouteConfig(namespace): `path` must be a non empty string.')
    }

    this.namespaces[key] = new RouteConfig({
      config: this.configManager.merge(this.config, this.configManager.set(config)),
      fullPath: fullPath || prefix(path, this.fullPath),
      id: id || prefix(key, this.id, '.'),
      key,
      namespaces,
      path,
      routes
    }, this.options)
    if (!this.keys.namespaces.includes(key)) {
      this.keys.namespaces.push(key)
    }
    return this.namespaces[key]
  }

  /**
   * @summary Adds route
   * @locus Anywhere
   * @instance
   * @memberof RouteConfig
   * @method route
   * @param {Object} route
   * @param {Object} [route.config]
   * @param {String} [route.fullPath]
   * @param {String} [route.id]
   * @param {String} route.key
   * @param {String} [route.path]
   * @return {RouteConfig}
   * @throws {TypeError}
   */
  route ({ config, fullPath, id, key, path }) {
    if (fullPath && typeof fullPath !== 'string') {
      throw new TypeError('RouteConfig(route): `fullPath` must be a non empty string.')
    }
    if (id && typeof id !== 'string') {
      throw new TypeError('RouteConfig(route): `id` must be a non empty string.')
    }
    if (typeof key !== 'string' || key === '') {
      throw new TypeError('RouteConfig(route): `key` must be a non empty string.')
    }
    if (path && typeof path !== 'string') {
      throw new TypeError('RouteConfig(route): `path` must be a string.')
    }

    const route = {
      config: this.configManager.merge(this.config, this.configManager.set(config)),
      fullPath: fullPath || prefix(path || '', this.fullPath),
      id: id || prefix(key, this.id, '.'),
      key
    }
    if (path) {
      route.path = path
    }
    this.routes[key] = route
    if (!this.keys.routes.includes(key)) {
      this.keys.routes.push(key)
    }
    return this
  }

  /**
   * @summary Returns route url for `key`
   * @locus Anywhere
   * @instance
   * @memberof RouteConfig
   * @method url
   * @param {String} [key='index']
   * @param {Object} [params]
   * @param {Object} [options]
   * @return {Null|String}
   */
  url (key = 'index', params = undefined, options = undefined) {
    if (typeof key !== 'string' || key === '') {
      throw new TypeError('RouteConfig(url): `key` must be a string.')
    }

    const route = this._findRoute(key)
    if (!route) return null
    const compiled = pathToRegexp.compile(route.fullPath)
    return (params || options) ? compiled(params, options) : route.fullPath
  }
}

/**
 * @summary Create route map from normalized map
 * @locus Anywhere
 * @memberof RouteConfig
 * @method fromNormalizedMap
 * @param {Object} normalizedMap
 * @param {Object} [options]
 * @return {RouteConfig}
 * @static
 */
RouteConfig.fromNormalizedMap = (normalizedMap, options) => {
  const routeSchema = new schema.Entity('routes')
  const namespaceSchema = new schema.Entity('namespaces', { routes: [routeSchema] })
  namespaceSchema.define({ namespaces: [namespaceSchema] })

  const normalizableMap = denormalize(normalizedMap.result, {
    namespaces: [namespaceSchema],
    routes: [routeSchema]
  }, normalizedMap.entities)

  const normalizableMapToMap = (nMap) => ({
    ...nMap,
    namespaces: nMap.namespaces.reduce((acc, namespace) => {
      acc[namespace.key] = normalizableMapToMap(namespace)
      return acc
    }, {}),
    routes: nMap.routes.reduce((acc, route) => {
      acc[route.key] = route
      return acc
    }, {})
  })

  return new RouteConfig(normalizableMapToMap(normalizableMap), options)
}
