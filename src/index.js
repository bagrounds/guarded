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

  function guarded (options) {
    return setProp('length', options.f.length, setProp('name', options.f.name,
      fn.compose(
        fn.curry(assert)(options.output),
        fn.reArg(fn.tee(fn.curry(assert)(options.inputs)), options.f)
      )
    ))
  }
})()

