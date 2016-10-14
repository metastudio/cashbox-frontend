module.exports = function () {
  return {
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel?presets[]=es2015&presets[]=stage-2&presets[]=react',
          exclude: /node_modules/,
        },
        {
          test: /bootstrap.+\.(jsx|js)$/,
          loader: 'imports?jQuery=jquery,$=jquery,this=>window'
        }
      ]
    }
  }
}
