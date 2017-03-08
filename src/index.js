/**
 *
 * @module guarded
 */
;(function () {
  'use strict'

  /* imports */
  var R = require('ramda')
  var funAssert = require('fun-assert')
  var compose = require('fun-compose')

  var INPUT_TYPE = '{inputs: [Function], f: Function, output: Function}'

  /* exports */
  module.exports = guarded({
    inputs: [funAssert.type(INPUT_TYPE)],
    f: guarded,
    output: funAssert.type('Function')
  })

  /**
   *
   * @function module:guarded.guarded
   *
   * @param {Object} options all input parameters
   * @param {[Function]} options.inputs - contracts
   * @param {Function} options.f - function to guard
   * @param {Function} options.output - contract
   *
   * @return {Function} f guarded with input and output contracts
   */
  function guarded (options) {
    return compose(options.output, guardInputs(options.f, options.inputs))
  }

  function guardInputs (f, contracts) {
    return function () {
      var args = Array.prototype.slice.call(arguments).map(R.of)

      return R.apply(f, R.zipWith(R.apply, contracts, args))
    }
  }
})()

