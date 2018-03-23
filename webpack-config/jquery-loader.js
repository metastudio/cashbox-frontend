module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /bootstrap.+\.(jsx|js)$/,
          use: [{
            loader: 'imports-loader',
            options: {
              jQuery: 'jquery'
            }
          }]
        }
      ]
    }
  }
}
