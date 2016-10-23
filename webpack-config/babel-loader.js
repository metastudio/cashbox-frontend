module.exports = function () {
  return {
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'stage-2', 'react'],
            plugins: [
              ['babel-plugin-transform-builtin-extend', { globals: ['Error', 'Array'] }]
            ]
          },
          exclude: /node_modules/,
        }
      ]
    }
  }
}
