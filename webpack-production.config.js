const WebpackStrip require('strip-loader'),
  devConfig require('./webpack.config.js'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  StatsPlugin = require('stats-webpack-plugin');

devConfig.plugins = devConfig.plugins.concat([
  new ExtractTextPlugin(
    '[name]-[hash].min.css'),

  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false,
      screw_ie8: true
    }
  }),

  new StatsPlugin('webpack.stats.json', {
    source: false,
    modules: false
  })
])

devConfig.devtool = 'source-map';
devConfig.module.loaders.push({
  test: /\.jsx$/,
  exclude: /node_modules/,
  loader: WebpackStrip.loader('console.log')
});

module.exports = devConfig;
