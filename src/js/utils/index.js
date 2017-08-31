var dom = require('./dom')(document, window)
var attributes = require('./attributes')

var self = {
  dom: dom,
  attributes: attributes
}

module.exports = self
