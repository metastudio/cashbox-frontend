/* global process */
/* global __dirname */

const path =  require('path')
const merge = require('webpack-merge')

const WebpackConfig = require('./webpack-config')

const DEV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

const PATHS = {
  app:   path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
}

const common = {
  resolve: {
    modules: [ PATHS.app, 'node_modules', 'lib' ],
  },

  entry: {
    app: [PATHS.app],
  },

  output: {
    publicPath: '/',
    path: PATHS.build,
    filename: '[name].js',
  },

  node: {
    fs:  'empty',
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  }
}

var config = merge(
  common,
  WebpackConfig.vendor(),
  WebpackConfig.indexHtml(PATHS.app),
  WebpackConfig.babelLoader(),
  WebpackConfig.jqueryLoader(),
  WebpackConfig.fontsLoader(),
  WebpackConfig.imagesLoader(),
  WebpackConfig.config(),
  WebpackConfig.progressBar()
)

if (DEV) {
  config = merge(
    WebpackConfig.hotReload(),
    config,
    WebpackConfig.devTools(),
    WebpackConfig.stylesDevLoader()
  )
} else {
  config = merge(
    config,
    WebpackConfig.uglify(),
    WebpackConfig.stylesLoader(),
    WebpackConfig.reactProduction()
  )
}

module.exports = config
