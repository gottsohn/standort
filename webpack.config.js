const path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin');
  
module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'app/main.js')
  ],

  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/dist/'),
    publicPath: '/'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        'presets': ['react', 'es2015']
      }
    }, {
      test: /\.css?$/,
      include: path.join(__dirname, 'app'),
      exclude: /node_modules/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5'
    }]
  }
};
