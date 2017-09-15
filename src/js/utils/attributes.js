module.exports = function (dom) {
  var self = {
    createContainer: function createContainer (parent, title, showTitle) {
      var className = ['container']
      if (title) {
        className.push('container-' + ('' + title).toLowerCase().replace(/ /g, '-'))
      }
      var content = ''
      if (title && (showTitle === undefined || showTitle)) {
        content = '<h5>' + title + '</h5>'
      }

      return dom.insertElement(parent, className.join(' '), content)
    },
    createProgress: function createProgress (container, title, value, min, max) {
      var className = ['attrib', 'type-progress']
      if (title) {
        className.push('attrib-' + ('' + title).toLowerCase().replace(/ /g, '-'))
      }
      var storyData = {
        attribute: 'progress',
        title: title,
        min: min,
        max: max,
        value: value
      }

      var percent = (value - min) / (max - min) * 100
      var markup = '<b>' + title + '</b><div class="progress"><div class="progress-bar" role="progressbar" ' +
        'style="width: ' + percent + '%;" aria-valuenow="' + value + '" aria-valuemin="' + min + '" aria-valuemax="' +
        max + '">' + value + '</div></div>'

      return dom.insertElement(container, className.join(' '), markup, storyData)
    },
    createText: function createText (container, title, value, formatter) {
      var className = ['attrib', 'type-text']
      if (title) {
        className.push('attrib-' + ('' + title).toLowerCase().replace(/ /g, '-'))
      }
      var storyData = {
        attribute: 'text',
        title: title,
        value: value,
        formatter: formatter || function (a) { return a }
      }

      var markup = '<b>' + title + ':</b> <span>' + storyData.formatter(value) + '</span>'

      return dom.insertElement(container, className.join(' '), markup, storyData)
    }
  }
  return self
}
