const webpack = require('webpack')

module.exports = function () {
  return {
    entry: {
      app: [
        'webpack-hot-middleware/client?reload=true',
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/,

          use: [{
            loader: 'react-hot-loader'
          }],

          exclude: /node_modules/,
          enforce: 'post'
        },
      ]
    }
  }
}
