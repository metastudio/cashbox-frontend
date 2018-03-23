const webpack = require('webpack')

const EXCLUDE_DEPENDENCIES = ['font-awesome', 'config', 'express']
const dependencies = Object.keys(require('../package.json').dependencies).filter((v) => EXCLUDE_DEPENDENCIES.indexOf(v) === -1)

module.exports = function () {
  return {
    entry: {
      vendor: dependencies,
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: '[name].js' }),
    ],
  }
}
