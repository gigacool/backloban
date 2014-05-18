if require?
  sinon = require('sinon')
  chai = require('chai')
  should = require('should')
  expect = chai.expect

if typeof window != "undefined"
  window.expect = window.chai.expect


describe 'no tests yet', ()->

  it 'should pass', ()->
    true.should.be.true