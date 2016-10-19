module.exports = function () {
  return {
    module: {
      loaders: [
        {
          test: /bootstrap.+\.(jsx|js)$/,
          loader: 'imports?jQuery=jquery,$=jquery,this=>window'
        }
      ]
    }
  }
}
