const webpack = require('webpack')

module.exports = function () {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({compress: { warnings: false }}),
    ],
  }
}
