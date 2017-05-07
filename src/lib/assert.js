;(function () {
  'use strict'

  /* imports */
  var stringify = require('./stringify')

  /* exports */
  module.exports = assert

  function assert (predicate, subject) {
    if (!(predicate(subject))) {
      throw Error('!' + predicate.name + '(' + stringify(subject) + ')')
    }

    return subject
  }
})()

