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
  module.exports = fn.curry(guarded)

  /**
   *
   * @function module:guarded.guarded
   *
   * @param {Function} inputsGuard - Array -> Boolean
   * @param {Function} outputGuard - z -> Boolean
   * @param {Function} f - (a, b, ...) -> z
   *
   * @return {Function} f guarded by inputsGuard and outputGuard
   */
  function guarded (inputsGuard, outputGuard, f) {
    return setProp('length', f.length, setProp('name', f.name,
      fn.compose(
        fn.curry(assert)(outputGuard),
        fn.reArg(fn.tee(fn.curry(assert)(inputsGuard)), f)
      )
    ))
  }
})()

