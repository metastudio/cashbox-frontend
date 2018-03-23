module.exports = function () {
  return {
    module: {
      rules: [
        { test: /\.png$/, use: [{
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }] },
        { test: /\.svg$/, use: [{
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }] },
        { test: /\.jpg$/, use: [{
          loader: 'file-loader'
        }] },
        { test: /\.gif$/, use: [{
          loader: 'file-loader'
        }] },
      ]
    }
  }
}
