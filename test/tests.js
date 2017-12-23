;(function () {
  'use strict'

  /* imports */
  const p = require('fun-predicate')
  const funTest = require('fun-test')
  const object = require('fun-object')
  const array = require('fun-array')
  const scalar = require('fun-scalar')
  const fn = require('fun-function')

  const u = object.map(fn.curry, {
    fnEqualFor: (x, f1, f2) => fn.lift(scalar.equal)(f1, f2)(x)
  })

  const tests = array.fold(array.concat, [], [
    array.map(
      x => ({
        predicate: u.fnEqualFor(x)(fn.id),
        inputs: [scalar.gt(0), fn.id],
        contra: object.get('input')
      }),
      array.range(1, 9)
    ),
    array.map(
      x => ({
        predicate: p.throwsWith([x]),
        inputs: [scalar.gt(0), fn.id],
        contra: object.get('input')
      }),
      array.range(-9, 0)
    ),
    array.map(
      x => ({
        predicate: u.fnEqualFor(x)(scalar.sum),
        inputs: [fn.argsToArray(scalar.equal), scalar.sum],
        contra: object.get('inputs')
      }),
      array.map(array.repeat(2), array.range(1, 9))
    ),
    array.map(
      x => ({
        predicate: p.throwsWith(x),
        inputs: [fn.argsToArray(scalar.equal), scalar.sum],
        contra: object.get('inputs')
      }),
      array.map(n => ([n, n + 1]), array.range(1, 9))
    ),
    array.map(
      x => ({
        predicate: u.fnEqualFor(x)(scalar.sum),
        inputs: [1, scalar.equal(0), scalar.sum],
        contra: object.get('inputN')
      }),
      array.map(n => ([n, 0]), array.range(1, 9))
    ),
    array.map(
      x => ({
        predicate: p.throwsWith(x),
        inputs: [1, scalar.equal(0), scalar.sum],
        contra: object.get('inputN')
      }),
      array.map(array.repeat(2), array.range(1, 9))
    ),
    array.map(
      x => ({
        predicate: u.fnEqualFor(x)(scalar.sum(1)),
        inputs: [scalar.gt(0), scalar.sum(1)],
        contra: object.get('output')
      }),
      array.range(0, 9)
    ),
    array.map(
      x => ({
        predicate: p.throwsWith(x),
        inputs: [scalar.gt(0), scalar.sum(1)],
        contra: object.get('output')
      }),
      array.range(-9, -1)
    ),
    array.map(
      x => ({
        predicate: u.fnEqualFor(x)(fn.id),
        inputs: [([i], o) => i === o, fn.id],
        contra: object.get('io')
      }),
      array.range(-5, 5)
    ),
    array.map(
      x => ({
        predicate: p.throwsWith(x),
        inputs: [([i], o) => i === o, scalar.sum(1)],
        contra: object.get('io')
      }),
      array.range(-5, 5)
    ),
    array.map(
      ([name, x]) => ({
        predicate: p.throwsWith(x),
        contra: s => x => fn.apply(x, object.get(name, s))
      }),
      array.flatten(array.map(([name, xs]) => array.map(x => [name, x], xs), [
        [
          'io',
          [[fn.id, 'x => x'], [fn.id, fn.id, '']]
        ],
        [
          'inputs',
          [[0, fn.id], [fn.id, fn.id, 0]]
        ],
        [
          'inputN',
          [['0', fn.id, fn.id], [0, fn.id, fn.id, []], [-1, fn.id, fn.id]]
        ],
        [
          'input',
          [[fn.id, []], [fn.id, fn.id, {}]]
        ],
        [
          'output',
          [[{}, fn.id], [fn.id, fn.id, null]]
        ]
      ]))
    )
  ])

  /* exports */
  module.exports = tests.map(funTest.sync)
})()

