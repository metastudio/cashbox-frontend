module.exports = function () {
  return {
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-2', 'react'],
              plugins: [
                ['babel-plugin-transform-builtin-extend', { globals: ['Error', 'Array'] }]
              ]
            }
          }],
          exclude: /node_modules/
        }
      ]
    }
  }
}
