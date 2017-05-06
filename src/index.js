/**
 *
 * @module guarded
 */
;(function () {
  'use strict'

  /* imports */
  var fn = require('fun-function')

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

  function assert (predicate, subject) {
    if (!(predicate(subject))) {
      throw Error('!' + predicate.name + '(' + stringify(subject) + ')')
    }

    return subject
  }

  function stringify (x) {
    return JSON.stringify(x)
  }

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

