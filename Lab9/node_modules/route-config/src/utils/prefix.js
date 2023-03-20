/**
 * @summary Use to namespacing route
 * @export
 * @function prefix
 * @param {String} base
 * @param {String} [prefix]
 * @param {String} [separator='']
 */
export default (base, prefix, separator = '') => {
  if (!prefix) return base
  return !base || base === 'index' ? prefix : `${prefix}${separator}${base}`
}
