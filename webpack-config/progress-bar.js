var ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = function () {
  return {
    plugins: [
      new ProgressBarPlugin()
    ],
  }
}
