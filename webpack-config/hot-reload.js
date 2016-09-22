const webpack = require('webpack')

module.exports = function () {
  return {
    entry: {
      app: [
        'webpack-hot-middleware/client?reload=true',
      ],
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
    module: {
      postLoaders: [
        {
          test: /\.jsx?$/,
          loader: 'react-hot',
          exclude: /node_modules/
        },
      ]
    }
  }
}
