var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

function scriptConfig (source) {
  return {
    entry: path.join(__dirname, 'src', 'js', source + '.js'),
    output: {
      path: path.resolve('./dist'),
      filename: source + '.js'
    },
    performance: {
      hints: 'warning'
    },
    devtool: 'source-map',
    target: 'web',
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_console: false
        }
      })
    ]
  }
}

function styleConfig (source) {
  return {
    entry: path.join(__dirname, 'src', 'css', source + '.js'),
    output: {
      path: path.resolve('./dist'),
      filename: source + '.css'
    },
    module: {
      loaders: [{
        test: /\.css/,
        loader: ExtractTextPlugin.extract({ loader: 'css-loader', options: { minimize: true } })
      }]
    },
    plugins: [
      new ExtractTextPlugin(source + '.css')
    ]
  }
}

module.exports = [scriptConfig('storyteller'), styleConfig('storyteller')]
