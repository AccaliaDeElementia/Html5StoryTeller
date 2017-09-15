'use strict'

// We're faking a browser environment here..... This is close enough.
global.document = {}
global.window = {}

const index = require('../../src/js/utils/index')

describe('utils', () => {
  it('should expose `dom`', () => {
    index.dom.should.be.an('object')
  })
  it('should expose `attributes`', () => {
    index.attributes.should.be.an('object')
  })
})
