/**
 *
 * @module guarded
 */
;(function () {
  'use strict'

  /* imports */
  const stringify = require('stringify-anything')

  const id = x => x
  const b = (f, g) => x => f(g(x))

  const ite = p => t => f => x => p(x) ? t(x) : f(x)

  const isType = t => x => typeof x === t
  const isNum = isType('number')
  const isFun = isType('function')

  const get = i => a => a[i]
  const arrAp = as => bs => as.map((f, i) => f(bs[i]))
  const objMap = (f, o) => Object.keys(o)
    .reduce((a, k) => { a[k] = f(o[k]); return a }, {})
  const objAp = (fs, o) => Object.keys(fs)
    .reduce((a, k) => { a[k] = fs[k](a[k]); return a }, o)

  const all = as => as.reduce((a, b) => a && b, true)
  const and = f => g => x => f(x) && g(x)
  const gte = n => m => m >= n
  const equal = a => b => a === b
  const lenEqual = n => a => equal(a.length)(n)
  const allFuns = b(all, arrAp([isFun, isFun]))
  const nFuns = n => and(lenEqual(n))(allFuns)

  const show = x => `\`${stringify(x)}\``
  const format = m =>
    `A contract with a guarded function has been broken!\n${m}`

  const toss = message => () => { throw Error(message) }
  const assert = (p, s, msg) => ite(p)(id)(toss(format(msg)))(s)

  const setProp = (key, value, target) => Object.defineProperty(
    target,
    key,
    Object.defineProperty(
      Object.getOwnPropertyDescriptor(target, key),
      'value',
      { value: value }
    )
  )
  const nameAndLength = (from, to) => setProp(
    'length',
    from.length,
    setProp('name', from.name, to)
  )

  /* exports */
  module.exports = { ite, id, toss, show, b, get, format, assert, nameAndLength,
    isType, isNum, isFun, arrAp, objMap, objAp, all, and, gte, equal, lenEqual,
    allFuns, nFuns }
})()

