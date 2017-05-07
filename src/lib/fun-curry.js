;(function () {
  'use strict'

  /* imports */
  var setProp = require('./set-prop')

  /* exports */
  module.exports = funCurry

  /**
   *
   * @function module:fun-curry.funCurry
   *
   * @param {Function} f - to curry
   * @param {Number} [arity] - number of arguments f should accept
   * @param {Array} [args] - initial arguments to apply
   *
   * @return {Function} a_1 -> a_2 -> ... -> a_arity -> f(a_1, ..., a_arity)
   */
  function funCurry (f, arity, args) {
    arity = arity || f.length
    args = args || []

    return setProp('length', arity, function curried () {
      var newArgs = args.concat(Array.prototype.slice.call(arguments))

      return newArgs.length >= arity
        ? f.apply(null, newArgs)
        : setProp(
          'length',
          arity - newArgs.length,
          funCurry(f, arity, newArgs)
        )
    })
  }
})()

