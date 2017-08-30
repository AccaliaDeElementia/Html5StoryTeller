module.exports = {
  selectElement: function selectElement (selector) {
    return document.querySelector(selector)
  },
  selectElements: function selectElements (selector) {
    return Array.prototype.slice.apply(document.querySelectorAll(selector))
  },
  createAttribute: function createAttribute () {}
}
