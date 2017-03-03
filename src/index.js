;(function () {
  'use strict'

  /* imports */
  var funPredicate = require('fun-predicate')
  var compose = require('fun-compose')

  /* exports */
  module.exports = guarded

  /**
   *
   * @param {Object} options all input parameters
   * @param {Function} options.input - contract
   * @param {Function} options.f - function to guard
   * @param {Function} options.output - contract
   * @return {Function} f guarded with input and output contracts
   */
  function guarded (options) {
    funPredicate.type('{input: Function, f: Function, output: Function}')

    return [options.output, options.f, options.input].reduce(compose)
  }
})()

