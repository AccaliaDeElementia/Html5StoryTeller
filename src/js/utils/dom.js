module.exports = function bind (document, window) {
  var self = {
    insertElement: function insertElement (parent, className, content, data, elementName) {
      var container = document.createElement(elementName || 'div')
      if (className) {
        container.className = className
      }
      container.storyData = data || {}
      container.innerHTML = content || ''

      if (typeof parent === 'string') {
        parent = self.select(parent)
      }
      parent.appendChild(container)

      return container
    },
    select: function select (selector, root) {
      return (root || document).querySelector(selector)
    },
    selectAll: function select (selector, root) {
      root = (root || document)
      return Array.prototype.slice.apply(root.querySelectorAll(selector))
    }
  }
  return self
}
