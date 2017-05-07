/**
 *
 * @module guarded
 */
;(function () {
  'use strict'

  /* imports */
  var fn = require('./lib/fun-function')
  var setProp = require('./lib/set-prop')
  var assert = require('./lib/assert')

  /* exports */
  module.exports = guarded

  /**
   *
   * @function module:guarded.guarded
   *
   * @param {Object} options - all input parameters
   * @param {Function} options.inputs - Array -> Boolean
   * @param {Function} options.f - (a, b, ...) -> z
   * @param {Function} options.output - z -> Boolean
   *
   * @return {Function} f guarded by inputs and output
   */
  function guarded (options) {
    return setProp('length', options.f.length, setProp('name', options.f.name,
      fn.compose(
        fn.curry(assert)(options.output),
        fn.reArg(fn.tee(fn.curry(assert)(options.inputs)), options.f)
      )
    ))
  }
})()

