module.exports = function () {
  return {
    module: {
      rules: [
        { test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }] },
        { test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/, use: [{
          loader: 'file-loader'
        }] },
      ]
    }
  }
}
