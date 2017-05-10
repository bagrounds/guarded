;(function () {
  'use strict'

  /* imports */
  var predicate = require('fun-predicate')
  var funTest = require('fun-test')
  var arrange = require('fun-arrange')
  var array = require('fun-array')
  var lens = require('fun-lens')
  var fn = require('fun-function')

  var output = predicate.type('Number')
  var inputs = array.all(predicate.type('Number'))

  function f (a, b, c) {
    return (a - b) / c
  }

  var returnsFunction = [
    [[inputs, output, f], predicate.type('Function')]
  ]

  var acceptsGoodInputs = [
    [
      [inputs, output, f],
      fn.compose(predicate.equal(f(1, 2, 3)), lens.get([[1, 2, 3]]))
    ]
  ]

  var rejectsBadInputs = array.cartesian(
    [[inputs, output, f]],
    [['1', 2, 3], [1, '2', 3], [1, 2, '3']]
  ).map(array.ap([fn.id, predicate.throwsWith]))

  var rejectsBadOutputs = [
    [
      [inputs, output, fn.compose(array.of, f)],
      predicate.throwsWith([1, 2, 3])
    ]
  ]

  /* exports */
  module.exports = array.fold(array.concat, [], [
    returnsFunction,
    acceptsGoodInputs,
    rejectsBadInputs,
    rejectsBadOutputs
  ]).map(arrange({ inputs: 0, predicate: 1 }))
    .map(funTest.sync)
})()

