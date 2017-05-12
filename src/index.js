/**
 *
 * @module guarded
 */
;(function () {
  'use strict'

  /* imports */
  var curry = require('fun-curry')
  var setProp = require('./lib/set-prop')
  var assert = require('./lib/assert')

  /* exports */
  module.exports = curry(guarded)

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
    return setProp('length', f.length,
      setProp('name', f.name,
        function () {
          return assert(outputGuard,
            f.apply(null,
              assert(inputsGuard, Array.prototype.slice.call(arguments))
            )
          )
        }
      )
    )
  }
})()

