var foo = require('./GameEngine')
var utils = require('./Utils')

function renderLayout () {
  var height = window.innerHeight
  var usedHeight = utils.selectElement('.navbar').getBoundingClientRect().height +
    utils.selectElement('.top-buttons').getBoundingClientRect().height +
    utils.selectElement('.bottom-buttons').getBoundingClientRect().height
  utils.selectElement('.main-text').style.height = (height - usedHeight - 1) + 'px'
}

window.onload = renderLayout
window.onresize = renderLayout
console.log(foo.foo())
