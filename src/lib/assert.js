;(function () {
  'use strict'

  /* imports */
  var stringify = require('stringify-anything')

  /* exports */
  module.exports = assert

  function assert (predicate, subject) {
    if (!(predicate(subject))) {
      throw Error('!' + stringify(predicate) + '(' + stringify(subject) + ')')
    }

    return subject
  }
})()

