const webpack = require('webpack')

module.exports = function () {
  return {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
    ],
  }
}
