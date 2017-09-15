'use strict'

const chai = require('chai')
chai.should()

const sinon = require('sinon')
chai.use(require('sinon-chai'))

var JSDOM = require('jsdom').JSDOM
var domFn = require('../../src/js/utils/dom')

const id = () => {
  return Math.floor(Math.random() * 1e9)
}

describe('GameUtils dom manipulation', () => {
  var document, window, jsdom, dom, container, sandbox
  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    jsdom = new JSDOM('<html><body><div class="content"></div></body></body>')
    window = jsdom.window
    document = window.document
    dom = domFn(document, window)
    container = document.querySelector('div')
  })
  afterEach(() => sandbox.restore())
  describe('insertElement()', () => {
    it('should export `insertElement`', () => {
      chai.expect(dom.insertElement).to.be.a('function')
    })
    it('should insert a div by default', () => {
      dom.insertElement('div')
      container.innerHTML.should.equal('<div></div>')
    })
    it('should set css class', () => {
      const test = 'css' + id()
      const elem = dom.insertElement('div', test)
      elem.className.should.equal(test)
    })
    it('should set content', () => {
      const test = 'text' + id()
      const elem = dom.insertElement('div', undefined, test)
      elem.innerHTML.should.equal(test)
    })
    it('should store storyData with element', () => {
      const data = { a: Math.random() }
      const elem = dom.insertElement('div', undefined, undefined, data)
      elem.storyData.should.equal(data)
    })
    it('should allow storing storyData with element', () => {
      const elem = dom.insertElement('div')
      elem.storyData.should.deep.equal({})
    })
    it('should insert a specified element type', () => {
      const target = 'element' + id()
      dom.insertElement('div', undefined, undefined, undefined, target)
      container.innerHTML.should.equal('<' + target + '></' + target + '>')
    })
    it('should return inserted element', () => {
      const target = 'element' + id()
      const className = 'class' + id()
      const elem = dom.insertElement('div', className, undefined, undefined, target)
      elem.tagName.should.equal(target.toUpperCase())
      elem.className.should.equal(className)
    })
    it('should select parent node via string', () => {
      const className = 'class' + id()
      const parent = dom.insertElement('div', className)
      const elem = dom.insertElement('.' + className)
      parent.lastElementChild.should.equal(elem)
    })
    it('should accept parent node directly', () => {
      const className = 'class' + id()
      const parent = document.createElement('div')
      const elem = dom.insertElement(parent, className)
      parent.lastElementChild.should.equal(elem)
      chai.expect(document.querySelector('.' + className)).to.equal(null)
    })
  })
  describe('select()', () => {
    it('should select from document', () => {
      const stub = sandbox.stub(document, 'querySelector')
      const className = '.class' + id()
      const expected = id()
      stub.returns(expected)
      const actual = dom.select(className)
      stub.should.be.calledWith(className)
      actual.should.equal(expected)
    })
    it('should select from root node', () => {
      const root = document.createElement('div')
      const docstub = sandbox.spy(document, 'querySelector')
      const stub = sandbox.spy(root, 'querySelector')
      const className = '.class' + id()
      dom.select(className, root)
      stub.should.be.calledWith(className)
      docstub.callCount.should.equal(0)
    })
  })
  describe('selectAll()', () => {
    it('should select all from document', () => {
      const stub = sandbox.stub(document, 'querySelectorAll')
      const className = '.class' + id()
      const expected = [id(), id(), id()]
      stub.returns(expected)
      const actual = dom.selectAll(className)
      stub.should.be.calledWith(className)
      actual.should.not.equal(expected)
      actual.should.deep.equal(expected)
    })
    it('should select all from root node', () => {
      const root = document.createElement('div')
      const docstub = sandbox.spy(document, 'querySelectorAll')
      const stub = sandbox.stub(root, 'querySelectorAll')
      const expected = [id(), id(), id()]
      stub.returns(expected)
      const className = '.class' + id()
      const actual = dom.selectAll(className, root)
      stub.should.be.calledWith(className)
      docstub.callCount.should.equal(0)
      actual.should.not.equal(expected)
      actual.should.deep.equal(expected)
    })
  })
})
