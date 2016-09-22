const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function () {
  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('css')
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract(['css', 'sass'])
        },
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].css', { allChunks: true }),
    ]
  }
}
