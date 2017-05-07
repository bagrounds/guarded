;(function () {
  'use strict'

  /* exports */
  module.exports = setProp

  function setProp (key, value, target) {
    return Object.defineProperty(
      target,
      key,
      Object.defineProperty(
        Object.getOwnPropertyDescriptor(target, key),
        'value',
        { value: value }
      )
    )
  }
})()

