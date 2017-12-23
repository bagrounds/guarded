/**
 *
 * @module guarded
 */
;(() => {
  'use strict'

  /* imports */
  const curry = require('fun-curry')
  const u = require('./utils')

  /**
   *
   * @function module:guarded.io
   *
   * @param {Function} p - (a, z) -> Boolean
   * @param {Function} f - a -> z
   *
   * @return {Function} f with (input, output) guarded by p
   */
  const io = (p, f) => {
    const msg = (i, o) => `(input -> output) pair (${u.show(i)} -> ` +
      `${u.show(o)}) from function ${u.show(f)} failed predicate ${u.show(p)}`

    return u.nameAndLength(
      f,
      (...input) => {
        const output = f.apply(null, input)
        u.assert(p.bind(null, input), output, msg(input, output))
        return output
      })
  }

  /**
   *
   * @function module:guarded.inputs
   *
   * @param {Function} p - ([a, ...]) -> Boolean
   * @param {Function} f - (a, ...) -> z
   *
   * @return {Function} f with arguments array guarded by p
   */
  const inputs = (p, f) => io((i, o) => p(i), f)

  /**
   *
   * @function module:guarded.inputN
   *
   * @param {Number} i - index of argument to guard
   * @param {Object} p - a_i -> Boolean
   * @param {Function} f - (..., a_i, ...) -> z
   *
   * @return {Function} f with ith argument guarded by p
   */
  const inputN = (i, p, f) => inputs(u.b(p, u.get(i)), f)

  /**
   *
   * @function module:guarded.input
   *
   * @param {Function} p - a -> Boolean
   * @param {Function} f - a -> z
   *
   * @return {Function} f with single argument guarded by p
   */
  const input = (p, f) => inputN(0, p, f)

  /**
   *
   * @function module:guarded.output
   *
   * @param {Function} p - z -> Boolean
   * @param {Function} f - a -> z
   *
   * @return {Function} f with output guarded by p
   */
  const output = (p, f) => io((i, o) => p(o), f)

  const api = { io, inputs, inputN, input, output }

  const guards = u.objMap(curry(api.io), {
    input: (i, o) => u.nFuns(2)(i) && u.isFun(o),
    inputN: (i, o) => u.and(u.lenEqual(3))(
      u.b(u.all, u.arrAp([u.and(u.isNum)(u.gte(0)), u.isFun, u.isFun]))
    )(i) && u.isFun(o),
    inputs: (i, o) => u.nFuns(2)(i) && u.isFun(o),
    output: (i, o) => u.nFuns(2)(i) && u.isFun(o),
    io: (i, o) => u.nFuns(2)(i) && u.isFun(o)
  })

  /* exports */
  module.exports = u.objMap(curry, u.objAp(guards, api))
})()

