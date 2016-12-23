;(function () {
  'use strict'

  /* imports */
  var funAssert = require('fun-assert')

  /* exports */
  module.exports = specChecker

  var isFunction = funAssert.type('Function')

  function specChecker (output) {
    isFunction(output)
    return output
  }
})()

