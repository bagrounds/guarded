/**
 *
 * @module fun-compose
 */
;(function () {
  'use strict'

  /* exports */
  module.exports = compose

  /**
   *
   * @function module:fun-compose.compose
   *
   * @param {Function} f - a unary function
   * @param {Function} g - an N-ary function
   * @return {Function} (f . g) - the N-ary function composition of f and g
   */
  function compose (f, g) {
    if (typeof f !== 'function' || typeof g !== 'function') {
      throw Error('f and g must be functions. f:' + f + ' g:' + g)
    }

    return setProp('length', g.length, setProp('name', dot(f, g), function () {
      return f(g.apply(null, arguments))
    }))
  }

  function dot (a, b) {
    return a.name + '.' + b.name
  }

  function setProp (prop, value, target) {
    return Object.defineProperty(
      target,
      prop,
      Object.defineProperty(
        Object.getOwnPropertyDescriptor(target, prop),
        'value',
        { value: value }
      )
    )
  }
})()

