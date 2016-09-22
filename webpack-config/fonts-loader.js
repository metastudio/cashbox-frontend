module.exports = function () {
  return {
    module: {
      loaders: [
        { test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000' },
        { test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/, loader: 'file' },
      ]
    }
  }
}
