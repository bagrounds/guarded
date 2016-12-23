;(function () {
  'use strict'

  /* imports */
  var specifier = require('specifier')
  var funAssert = require('fun-assert')

  /* exports */
  module.exports = specChecker

  var isFunction = funAssert.type('Function')
  var isBoolean = funAssert.type('Boolean')
  var or = funAssert.or

  var spec = {
    input: [
      isFunction
    ],
    output: [
      isFunction
    ],
    sync: [
      or([isBoolean, funAssert.falsey])
    ]
  }

  var checker = specifier(spec)

  function specChecker (options) {
    return checker(options)
  }
})()

