const path              = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (appPath) {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Cashbox',
        template: path.join(appPath, 'index.ejs'),
      }),
    ],
  }
}
