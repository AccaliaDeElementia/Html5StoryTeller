'use strict'

const chai = require('chai')
chai.should()

// const sinon = require('sinon')
// chai.use(require('sinon-chai'))

var JSDOM = require('jsdom').JSDOM
var domFn = require('../../src/js/utils/dom')

describe('GameUtils dom manipulation', () => {
  var document, window, jsdom, dom
  beforeEach(() => {
    jsdom = new JSDOM('<html><body><div class="content"></div></body></body>')
    window = jsdom.window
    document = window.document
    dom = domFn(document, window)
  })
  describe('insertElement()', () => {
    it('should export `insertElement`', () => {
      chai.expect(dom.insertElement).to.be.a('function')
    })
    it('should insert a div by default', () => {
      dom.insertElement('div')
      parent.innerHTML.should.equal('<div class=""></div>')
    })
    
    it('should insert a specified element type', () => {
      const target = 'element' + (Math.floor(Math.random() * 10000))
      dom.insertElement('div', undefined, undefined, undefined, target)
      parent.innerHTML.should.equal('<' + target + ' class=""></' + target + '>')
    })
  })
})
