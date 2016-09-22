module.exports = function () {
  return {
    module: {
      loaders: [
        { test: /\.png$/, loader: 'url-loader?limit=100000' },
        { test: /\.svg$/, loader: 'url-loader?limit=100000' },
        { test: /\.jpg$/, loader: 'file' },
        { test: /\.gif$/, loader: 'file' },
      ]
    }
  }
}
