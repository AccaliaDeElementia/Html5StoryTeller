'use strict'

const chai = require('chai')
chai.should()

const sinon = require('sinon')
chai.use(require('sinon-chai'))

const domFn = require('../../src/js/utils/dom')
const attributesFn = require('../../src/js/utils/attributes')

const id = () => {
  return Math.floor(Math.random() * 1e9)
}

describe('utils/attributes', () => {
  let sandbox, stubInsertElement, attributes
  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    let dom = domFn()
    stubInsertElement = sandbox.stub(dom, 'insertElement').returns(null)
    attributes = attributesFn(dom)
  })
  afterEach(() => sandbox.restore())
  describe('createContainer()', () => {
    it('should pass parent to insertElement', () => {
      const expected = id()
      attributes.createContainer(expected)
      stubInsertElement.firstCall.args[0].should.equal(expected)
    })
    it('should create expected css class without title', () => {
      const expected = 'container'
      attributes.createContainer(id())
      stubInsertElement.firstCall.args[1].should.equal(expected)
    })
    it('should create expected css class with title', () => {
      const title = id()
      const expected = 'container container-' + title
      attributes.createContainer(id(), title)
      stubInsertElement.firstCall.args[1].should.equal(expected)
    })
    it('should lowercase title for css class', () => {
      const title = 'HELLO'
      const expected = 'container container-hello'
      attributes.createContainer(id(), title)
      stubInsertElement.firstCall.args[1].should.equal(expected)
    })
    it('should replace spaces in  title for css class', () => {
      const title = 'hello world'
      const expected = 'container container-hello-world'
      attributes.createContainer(id(), title)
      stubInsertElement.firstCall.args[1].should.equal(expected)
    })
    it('should not include title when no title provided', () => {
      attributes.createContainer(id())
      stubInsertElement.firstCall.args[2].should.equal('')
    })
    it('should include title when title provided', () => {
      const title = 'Hello world'
      const expected = '<h5>Hello world</h5>'
      attributes.createContainer(id(), title)
      stubInsertElement.firstCall.args[2].should.equal(expected)
    })
    it('should not include title when showTitle is falsy', () => {
      const title = 'Hello world'
      const expected = ''
      attributes.createContainer(id(), title, 0)
      stubInsertElement.firstCall.args[2].should.equal(expected)
    })
  })
  describe('createProgress()', () => {
    it('should insert element into container', () => {
      const container = id()
      attributes.createProgress(container)
      stubInsertElement.firstCall.args[0].should.equal(container)
    })
    it('should set `attrib` css class', () => {
      attributes.createProgress(id())
      const attrs = stubInsertElement.firstCall.args[1].split(' ')
      attrs.should.include('attrib')
    })
    it('should set `type-progress` css class', () => {
      attributes.createProgress(id())
      const attrs = stubInsertElement.firstCall.args[1].split(' ')
      attrs.should.include('type-progress')
    })
    it('should add class identifying attribute title', () => {
      attributes.createProgress(id(), 'HELLO World')
      const attrs = stubInsertElement.firstCall.args[1].split(' ')
      attrs.should.include('attrib-hello-world')
    })
    it('should set storyData', () => {
      const title = id()
      const min = id()
      const max = id()
      const value = id()
      const expected = {
        attribute: 'progress',
        title: title,
        min: min,
        max: max,
        value: value
      }
      attributes.createProgress(id(), title, value, min, max)
      stubInsertElement.firstCall.args[3].should.deep.equal(expected)
    })
    it('should construct markup', () => {
      const expected = '<b>Health</b><div class="progress"><div class="progress-bar" role="progressbar" ' +
        'style="width: 80%;" aria-valuenow="800" aria-valuemin="0" aria-valuemax="1000">800</div></div>'
      attributes.createProgress(id(), 'Health', 800, 0, 1000)
      stubInsertElement.firstCall.args[2].should.equal(expected)
    })
  })
  describe('createText()', () => {
    it('should insert element into container', () => {
      const container = id()
      attributes.createText(container)
      stubInsertElement.firstCall.args[0].should.equal(container)
    })
    it('should set `attrib` css class', () => {
      attributes.createText(id())
      const attrs = stubInsertElement.firstCall.args[1].split(' ')
      attrs.should.include('attrib')
    })
    it('should set `type-progress` css class', () => {
      attributes.createText(id())
      const attrs = stubInsertElement.firstCall.args[1].split(' ')
      attrs.should.include('type-text')
    })
    it('should add class identifying attribute title', () => {
      attributes.createText(id(), 'HELLO World')
      const attrs = stubInsertElement.firstCall.args[1].split(' ')
      attrs.should.include('attrib-hello-world')
    })
  })
})
