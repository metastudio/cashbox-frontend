const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract('css')
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract(['css', 'sass'])
        },
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].css', { allChunks: true }),
    ]
  }
}
