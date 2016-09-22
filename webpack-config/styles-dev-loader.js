module.exports = function () {
  return {
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css']
        },
        {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass']
        },
      ]
    }
  }
}
