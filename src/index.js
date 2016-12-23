;(function () {
  'use strict'

  /* imports */
  var optionsChecker = require('./spec-options')
  var outputChecker = require('./spec-output')

  /* exports */
  module.exports = guardedGuarded

  function guardedGuarded (options) {
    return outputChecker(guarded(optionsChecker(options)))
  }

  /**
   *
   * @param {Object} options all input parameters
   * @param {Function} options.input checks input
   * @param {Function} options.output checks output
   * @param {Boolean} options.sync guard a synchronous function
   * @return {Function} that takes a function and returns a guarded function
   */
  function guarded (options) {
    var inputChecker = options.input
    var outputChecker = options.output

    if (options.sync) {
      return syncGuardConstructor(inputChecker, outputChecker)
    }

    return asyncGuardConstructor(inputChecker, outputChecker)
  }

  function syncGuardConstructor (inputChecker, outputChecker) {
    return function syncGuard (vulnerable) {
      return function (input) {
        return outputChecker(vulnerable(inputChecker(input)))
      }
    }
  }

  function asyncGuardConstructor (inputChecker, outputChecker) {
    return function asyncGuard (vulnerable) {
      return function (options, callback) {
        vulnerable(inputChecker(options), function (error, result) {
          callback(error, outputChecker(result))
        })
      }
    }
  }
})()

