/* global process */
/* global __dirname */

const path      = require('path')
const express   = require('express')
const webpack   = require('webpack')
const basicAuth = require('basic-auth')
const history   = require('connect-history-api-fallback')
const config    = require('./webpack.config.js')

const CONFIG = require('config').get('server')
const ENV    = process.env.NODE_ENV || 'development'
const DEV    = ENV === 'development'

const port = process.env.PORT || CONFIG.port
const app = express()
const desktopRoot =  path.join(__dirname, 'build')

let authorize = function (req, res, next) {
  if(!CONFIG.basicAuth) return next()

  let unauthorized = (res) => {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required')
    return res.send(401)
  }

  let user = basicAuth(req) || {}

  if (user.name === CONFIG.basicAuth.user && user.pass === CONFIG.basicAuth.password) {
    return next()
  } else {
    return unauthorized(res)
  }
}


app.use(authorize)
app.use(history())

if (DEV) {
  let webpackMiddleware = require('webpack-dev-middleware')
  let webpackHotMiddleware = require('webpack-hot-middleware')
  let compiler = webpack(config)
  let middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })

  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))

} else {
  app.use(express.static(desktopRoot))
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err)
  }

  console.info('==> Started in %s and listening on port %s.', ENV, port)
})
