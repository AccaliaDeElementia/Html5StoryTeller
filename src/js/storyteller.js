// var foo = require('./GameEngine')
var utils = require('./utils')

function renderLayout () {
  var height = window.innerHeight
  var usedHeight = utils.dom.select('.navbar').getBoundingClientRect().height +
    utils.dom.select('.top-buttons').getBoundingClientRect().height +
    utils.dom.select('.bottom-buttons').getBoundingClientRect().height
  utils.dom.select('.main-text').style.height = (height - usedHeight - 1) + 'px'
}

window.onload = renderLayout
window.onresize = renderLayout

var playerName = utils.attributes.createContainer('.stats-column', 'Player Name', false)
utils.attributes.createText(playerName, 'Name', 'Fenne')

var playerStats = utils.attributes.createContainer('.stats-column', 'Core Stats')
utils.attributes.createProgress(playerStats, 'Strength', 10, 0, 30)
utils.attributes.createProgress(playerStats, 'Dexterity', 22, 0, 30)
utils.attributes.createProgress(playerStats, 'Constitution', 14, 0, 30)
utils.attributes.createProgress(playerStats, 'Inteligence', 16, 0, 30)
utils.attributes.createProgress(playerStats, 'Wisdom', 13, 0, 30)
utils.attributes.createProgress(playerStats, 'Charisma', 16, 0, 30)

var combatStats = utils.attributes.createContainer('.stats-column', 'Combat Stats')
utils.attributes.createProgress(combatStats, 'Health', 856, 0, 999)
utils.attributes.createProgress(combatStats, 'Magick', 491, 0, 999)
utils.attributes.createProgress(combatStats, 'Stamina', 372, 0, 999)

var advancement = utils.attributes.createContainer('.stats-column', 'Advancement')
utils.attributes.createText(advancement, 'Level', 99)
utils.attributes.createProgress(advancement, 'Experience', 999, 0, 100)
utils.attributes.createText(advancement, 'Gems', 9876)

var worldStats = utils.attributes.createContainer('.stats-column', 'World Stats', false)
utils.attributes.createText(worldStats, 'Day', 48)
utils.attributes.createText(worldStats, 'Hour', 13, function (a) { return a + ':00' })
var weather = utils.attributes.createText(worldStats, 'Weather', 'Clear')

setTimeout(function () {
  utils.attributes.updateValue(weather, 'Stormy')
  utils.attributes.updateValue('.attrib-strength', 20)
}, 500)
