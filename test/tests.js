;(function () {
  'use strict'

  /* imports */
  var funTest = require('fun-test')
  var funAssert = require('fun-assert')

  /* exports */
  module.exports = [
    test1(),
    test2(),
    test3(),
    test4(),
    test5(),
    test6(),
    test7()
  ]

  function test1 () {
    var test = funTest({
      input: {},
      verifier: function verifier (error, result) {
        funAssert.truthy(error)
      }
    })

    test.description = 'Should error for invalid input'

    return test
  }

  function test2 () {
    var testInput = {
      input: funAssert.falsey,
      output: funAssert.falsey,
      sync: true
    }

    var test = funTest({
      input: testInput,
      verifier: function verifier (error, result) {
        funAssert.falsey(error)
      },
      sync: true
    })

    test.description = 'Should not error for valid input'

    return test
  }

  function test3 () {
    var isFunction = funAssert.type('Function')

    var testInput = {
      input: funAssert.falsey,
      output: funAssert.falsey,
      sync: true
    }

    var test = funTest({
      input: testInput,
      verifier: function verifier (error, result) {
        funAssert.falsey(error)
        isFunction(result)
      },
      sync: true
    })

    test.description = 'Should return a function'

    return test
  }

  function test4 () {
    function testFunction () {}

    var test = funTest({
      input: testFunction,
      verifier: function verifier (error, guardedTestFunction) {
        funAssert.falsey(error)

        var inputError
        try {
          guardedTestFunction('not falsey')
        } catch (e) {
          inputError = e
        }

        funAssert.truthy(inputError)

        try {
          funAssert.falsey(guardedTestFunction())
        } catch (e) {
          funAssert.falsey(e)
        }
      },
      transformer: syncTransformer,
      sync: true
    })

    test.description = 'Should guard input of sync test function'

    return test
  }

  function test5 () {
    function testFunction () { return true }

    var test = funTest({
      input: testFunction,
      verifier: function verifier (error, guardedTestFunction) {
        funAssert.falsey(error)

        var outputError
        try {
          guardedTestFunction()
        } catch (e) {
          outputError = e
        }

        funAssert.truthy(outputError)
      },
      transformer: syncTransformer,
      sync: true
    })

    test.description = 'Should guard output of sync test function'

    return test
  }

  function test6 () {
    function testFunction (options, callback) { callback() }

    var test = funTest({
      input: testFunction,
      verifier: function verifier (error, guardedTestFunction) {
        funAssert.falsey(error)

        var inputError
        try {
          guardedTestFunction('not falsey', function (error, result) {
            // this shouldn't be reached
            funAssert.falsey(error)
          })
        } catch (e) {
          inputError = e
        }

        funAssert.truthy(inputError)

        try {
          guardedTestFunction(null, function (error, result) {
            funAssert.falsey(error)
            funAssert.falsey(result)
          })
        } catch (e) {
          console.log(e)
          funAssert.falsey(e)
        }
      },
      transformer: asyncTransformer,
      sync: true
    })

    test.description = 'Should guard input of async test function'

    return test
  }

  function test7 () {
    function testFunction (options, callback) { callback(null, true) }

    var test = funTest({
      input: testFunction,
      verifier: function verifier (error, guardedTestFunction) {
        funAssert.falsey(error)

        var outputError
        try {
          guardedTestFunction(null, function (error, result) {
            // this shouldn't be reached
            funAssert.falsey(error)
          })
        } catch (e) {
          outputError = e
        }

        funAssert.truthy(outputError)
      },
      transformer: asyncTransformer,
      sync: true
    })

    test.description = 'Should guard output of async test function'

    return test
  }

  function asyncTransformer (guarded) {
    var testInput = {
      input: funAssert.falsey,
      output: funAssert.falsey
    }

    return function (testFunction) {
      var guardTestFunction = guarded(testInput)

      return guardTestFunction(testFunction)
    }
  }

  function syncTransformer (guarded) {
    var testInput = {
      input: funAssert.falsey,
      output: funAssert.falsey,
      sync: true
    }

    return function (testFunction) {
      var guardTestFunction = guarded(testInput)

      return guardTestFunction(testFunction)
    }
  }
})()

