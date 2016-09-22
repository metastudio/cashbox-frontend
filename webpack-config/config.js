const webpack = require('webpack')

const REQUIRED_CONFIG = [
  'endpoint.protocol',
  'endpoint.hostname',
  'cookies.key',
]

module.exports = function () {
  const config = require('config').get('frontend')

  REQUIRED_CONFIG.forEach(configKey => config.get(configKey))

  return {
    plugins: [
      new webpack.DefinePlugin({
        __CONFIG__: JSON.stringify(config),
      }),
    ],
  }
}
