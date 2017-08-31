var dom = require('./dom')

var self = {
  createContainer: function createContainer (parent, title, showTitle) {
    var className = 'container-' + title.toLowerCase().replace(/ /g, '-') + ' d-flex flex-column rounded'
    var content = ''
    if (showTitle === undefined || showTitle) {
      content = '<h5>' + title + '</h5>'
    }

    return dom.insertElement(parent, className, content)
  },
  createProgress: function createProgress (container, title, value, min, max, formatter) {
    var className = 'attrib-' + title.toLowerCase() + ' attrib type-progress'
    var storyData = {
      attribute: 'progress',
      title: title,
      min: min,
      max: max,
      value: value,
      formatter: formatter || function (a) { return a }
    }

    var percent = (value - min) / (max - min) * 100
    var markup = '<b>' + title + '</b><div class="progress"><div class="progress-bar" role="progressbar" ' +
      'style="width: ' + percent + '%;" aria-valuenow="' + value + '" aria-valuemin="' + min + '" aria-valuemax="' +
      max + '">' + value + '</div></div>'

    return dom.insertElement(container, className, markup, storyData)
  },
  createText: function createText (container, title, value, formatter) {
    var className = 'attrib-' + title.toLowerCase() + ' attrib type-text'
    var storyData = {
      attribute: 'text',
      title: title,
      value: value,
      formatter: formatter || function (a) { return a }
    }

    var markup = '<b>' + title + ':</b> <span>' + storyData.formatter(value) + '</span>'

    return dom.insertElement(container, className, markup, storyData)
  },
  updateValue: function updateValue (attribute, value) {
    if (typeof attribute === 'string') {
      attribute = dom.select(attribute)
    }

    if (attribute.storyData.attribute === 'progress') {
      // it's a progress bar
      var bar = dom.select('.progress-bar', attribute)
      var min = attribute.storyData.min
      var max = attribute.storyData.max
      var percent = (value - min) / (max - min) * 100
      bar.setAttribute('aria-valuenow', value)
      bar.style.width = percent + '%'
      bar.innerHTML = attribute.storyData.formatter(value)
      attribute.storyData.value = value
    } else {
      // Must be text
      var span = dom.select('span', attribute)
      span.innerHTML = attribute.storyData.formatter(value)
      attribute.storyData.value = value
    }
  }
}

module.exports = self
